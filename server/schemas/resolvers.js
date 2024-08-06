const { Question, User } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");
const { createWriteStream, existsSync, mkdirSync } = require('fs');
const { GraphQLUpload } = require('graphql-upload');
const Jimp = require("jimp");
const path = require('path');

const resolvers = {
  Query: {
    getQuestion: async () => {
        const questions = await Question.find({}).populate('userId').sort('-createdAt');
        return questions;
    },
    getUser: async (parent, { username }) => {
      const foundUser = await User.findOne({
        username: username,
      });

      if (!foundUser) {
        return "Cannot find a user with this id!";
      }
      return foundUser;
    },
    getSingleQuestion: async (parent, { questionId }) => {
      const foundQuestion = await Question.findOne({
        _id: questionId,
      }).populate('userId').populate('answer.answerUserId');

      if (!foundQuestion) {
        return "Cannot find a question with this id!";
      }
      return foundQuestion;
    },
    getSingleQuestionVote: async (parent, {questionId, userId}) => {
      const foundVote = await Question.findOne({
        _id: questionId,
      });
      
      const result = foundVote.votes.filter((vote)=> userId === vote.userId.toString() );
      return {votes:result}

    },
    getSingleAnswerVote: async (parent, { questionId, answerId, userId }) => {
      const foundAnswer = await Question.findOne({
        _id: questionId,
      })
      const answerIndex = foundAnswer.answer.findIndex((answer) => answer._id.toString() === answerId);
      const result = foundAnswer.answer[answerIndex].votes.filter((vote)=> userId === vote.userId.toString() );
      return {votes:result}
    }
  },
  Mutation: {
    createUser: async (parent, { username, email, password, verified }) => {
      const user = await User.create({ username, email, password, verified });
      const token = signToken(user);
      return { token, user };
    },
    saveQuestionVote: async (parent, { questionId, userId }) => {
      const saveQVote = await Question.findOneAndUpdate(
        { _id: questionId },
        { $addToSet: { votes: {userId} } },
        { new: true }
      );
      return saveQVote;
    },
    saveAnswerVote: async (parent, { questionId, answerId, userId }) => {
      const question = await Question.findById(questionId);
      const answerIndex = question.answer.findIndex((answer) => {
        return answer._id.toString()  == answerId;
      });
      question.answer[answerIndex].votes.push({userId});
      await question.save();
      const questionNew = await Question.findById(questionId);
      return questionNew;      
    },
    saveQuestion: async (parent, { userId, textContent }) => {
      const saveQ = Question.create({ userId, textContent });
      return saveQ;
    },
    saveAnswer: async (parent, { userId, questionId, textContent }) => {
      const saveA = Question.findOneAndUpdate(
        { _id: questionId },
        { $push: { answer: { textContent, answerUserId: userId } } }
      );

      return saveA;
    },
    deleteQuestionVote: async (parent, { questionId, userId }) => {
      const question = await Question.findById(questionId);
      const votesIndex = question.votes.findIndex((votes) => votes.userId === userId);
      question.votes.splice(votesIndex, 1);
      await question.save();
      return question;
    },
    deleteAnswerVote: async (parent, { questionId, answerId, userId }) => {
      const question = await Question.findById(questionId);
      const answerIndex = question.answer.findIndex((answer) => answer._id.toString() === answerId);
      const votesIndex = question.answer[answerIndex].votes.findIndex((votes) => votes.userId === userId);
      question.answer[answerIndex].votes.splice(votesIndex, 1);
      await question.save();
      return question;
    },
    deleteQuestion: async (parent, { questionId }) => {
      const deleteQ = await Question.deleteOne({ _id: questionId });
      return;
    },
    deleteAnswer: async (parent, { questionId, answerId }) => {
      const question = await Question.findById(questionId);
      const answerIndex = question.answer.findIndex((answer) => answer._id.toString() === answerId);
      question.answer.splice(answerIndex, 1);
      await question.save();
      return question;
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    saveAvatarImg: async (parent, { userId, avatarImg }) => {
      const saveAvatarImg = User.findOneAndUpdate(
        { _id: userId },
        { avatarImg: avatarImg },
        { new: true }
      );

      return saveAvatarImg;
    },  
    saveUserInfo: async (parent, {userId, username, email, bio, avatarImg}) => {
      const saveUser = User.findOneAndUpdate(
        { _id: userId },
        { username, email, bio, avatarImg },
        { new: true }
      )
      return saveUser;
    }, 
    uploadFile: async (parent, {file, userId}) => {
      const { file: { filename, mimetype, encoding, createReadStream }, } = file;
      const fileExt = filename.substr(filename.length - 3); 
      const stream = createReadStream();
      let filePath ;
      if (process.env.NODE_ENV === "production") {
        filePath  = `/user_images/${userId}.${fileExt}`;
      } else {
        filePath  = `../client/public/user_images/${userId}.${fileExt}`;
      }
      
      await new Promise((resolve, reject) =>
        stream
          .pipe(createWriteStream(filePath))
          .on('finish', resolve)
          .on('error', reject)
      );
      await Jimp.read(filePath, (err, img) => {
        if (err) throw err;
        img
          .resize(256, 256) // resize
          .write(path); // save
      });
      return { filename, mimetype, this:"test" };
    },
  },
  
};

module.exports = resolvers;
