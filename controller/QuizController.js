const QuizModel = require("../models/QuizModel");

const runQuiz = async (req, res) => {
  const { quizid: quizId } = req.params;

  try {
    const quiz = await QuizModel.findById(quizId);

    const code = "123212";

    res.status(200).json({ quiz, code, message: "Quiz is running", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

const cancelQuiz = async (req, res) => {
  const { quizid: quizId } = req.params;

  try {
    const quiz = await QuizModel.findById(quizId);

    res
      .status(200)
      .json({ quiz, message: `Quiz "${quiz.quizName}" has been cancelled`, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

module.exports = { runQuiz, cancelQuiz };
