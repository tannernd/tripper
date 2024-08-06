const { Schema, model } = require("mongoose");

const voteSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { _id : false }
);




module.exports = voteSchema
