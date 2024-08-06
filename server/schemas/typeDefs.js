const typeDefs = `
scalar Upload

type Vote {
    userId: ID
}

type Answer {
    _id: ID!
    answerUserId: User!
    textContent: String!
    votes: [Vote]
    createdAt: String!
    answerVote: Int
}

type Question {
    _id: ID!
    userId: User!
    textContent: String!
    answer: [Answer]
    votes: [Vote]
    createdAt: String!
    questionVote: Int
}

type User {
    _id: ID!
    email: String!
    username: String!
    password: String!
    verified: Boolean
    avatarImg: String
    bio: String
}

type Auth {
    token: ID!
    user: User
}

type File {
    filename: String!
    mimetype: String!
  }

type Query {
    getQuestion: [Question]
    getUser(username: String!): User
    getSingleQuestion(questionId: String!) : Question
    getSingleQuestionVote(questionId: String!, userId: String!) : Question
    getSingleAnswerVote(questionId: String!, answerId: String!, userId: String!) : Answer
  }

type Mutation {
    createUser(username: String!, email: String!, password: String!, verified: Boolean): Auth
    saveQuestionVote(questionId: String!, userId: String!): Question
    saveAnswerVote(questionId: String!, answerId: String!, userId: String!): Question
    saveQuestion(userId: String!, textContent:String!): Question
    saveAnswer(userId: ID!, questionId: ID!, textContent: String!): Question
    saveAvatarImg(userId: ID!, avatarImg: String!) : User
    deleteQuestionVote(questionId: String!, userId: String!): Question
    deleteAnswerVote(questionId: String!, userId: String!, answerId: String!): Question
    deleteQuestion(questionId: String!): Question
    deleteAnswer(questionId: String!, answerId: String!): Question
    login(email: String!, password: String!): Auth
    saveUserInfo(userId: String!, username: String, email: String, bio:String, avatarImg: String): User
    uploadFile(file: Upload!, userId: String!): File!
}

`

module.exports = typeDefs;