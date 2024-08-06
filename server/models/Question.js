const { Schema, model } = require("mongoose");
const moment = require("moment");

const answerSchema = require('./Answer');
const voteSchema = require('./Vote');

const questionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    textContent: {
      type: String,
      required: true,
      maxlength: 4000,
    },
    answer: [answerSchema],
    votes:[voteSchema],
    
  },
  {
    timestamps:true,
    toJSON: {
      getters: true,
      virtuals: true
    },
  }
);

questionSchema.virtual('questionVote').get(function () {
  return this.votes.length;
});

const Question = model("Question", questionSchema);

module.exports = Question;
