const { Schema, model } = require("mongoose");
const moment = require("moment");


const voteSchema = require("./Vote");

const answerSchema = new Schema(
  {
    answerUserId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    textContent: {
      type: String,
      required: true,
      maxlength: 4000,
    },
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

answerSchema.virtual('answerVote').get(function () {
  return this.votes.length;
});
module.exports = answerSchema;
