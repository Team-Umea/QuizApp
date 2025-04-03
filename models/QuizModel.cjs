const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const quizQuestionSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    options: {
      type: [String],
      required: true,
    },
    answers: {
      type: [String],
      required: true,
    },
  },
  { _id: false }
);

const quizSchema = new Schema({
  user: {
    type: String,
    required: true,
  },
  quizName: {
    type: String,
    default: "",
  },
  questions: {
    type: [quizQuestionSchema],
    required: true,
  },
});

const quizModel = mongoose.model("quizes", quizSchema);
module.exports = quizModel;
