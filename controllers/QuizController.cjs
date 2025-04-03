const { default: quizModel } = require("../models/QuizModel.cjs");
const QuizModel = require("../models/QuizModel.cjs");

const watchQuiz = async (req, res) => {
  const userId = req.user._id;
  const quizData = { ...req.body, quizName: "My first quiz", user: userId };

  try {
    const existingQuiz = await QuizModel.findOne({ _id: quizData.quizId });

    const { quizId, ...cleanedQuizData } = quizData;

    if (!existingQuiz) {
      const newQuiz = new QuizModel({ ...cleanedQuizData });
      await newQuiz.save();
      return res
        .status(201)
        .json({ quiz: newQuiz, message: "Quiz created successfully", success: true });
    }

    const quiz = await QuizModel.findOneAndUpdate({ _id: quizData.quizId }, { ...cleanedQuizData });

    res.status(200).json({ quiz, message: "Quiz updated successfully", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Interal server error", success: false });
  }
};

const getQuizes = async (req, res) => {
  const userId = req.user._id;

  try {
    const quizes = await QuizModel.find({ user: userId });

    return res.status(200).json({ quizes, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Interal server error", success: false });
  }
};

module.exports = { watchQuiz, getQuizes };
