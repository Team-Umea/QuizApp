const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const quizQuestionSchema = new Schema({
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
});

const quizSchema = new Schema({
  user: {
    type: String,
    required: true,
  },
  quizName: {
    type: String,
    required: true,
  },
  questions: {
    type: [quizQuestionSchema],
    required: true,
  },
});

const quizModel = mongoose.model("quizes", quizSchema);
module.exports = quizModel;
