const QuizModel = require("../models/QuizModel");
const { shuffleArray } = require("../utils/helpers");

const startQuiz = async (quizManager) => {
  try {
    const quizes = await QuizModel.find().lean();
    const quiz = quizes[0];

    quizManager.addQuiz(String(quiz._id), {
      ...quiz,
      questions: shuffleArray(quiz.questions),
      _id: String(quiz._id),
      code: "111111",
    });
  } catch (error) {
    console.error(error);
  }
};

const watchQuiz = async (req, res) => {
  const userId = req.user._id;
  const quizData = { ...req.body, user: userId };

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

    const quizToUpdate = await QuizModel.findOne({ _id: quizData.quizId });

    if (!quizToUpdate) {
      return res.status(404).json({ message: "Quiz not found", success: false });
    }

    if (quizToUpdate.isRunning) {
      return res
        .status(400)
        .json({ message: "Cannot update quiz that is running", success: false });
    }

    const updatedQuiz = await QuizModel.findOneAndUpdate({ _id: quizId }, cleanedQuizData, {
      new: true,
    });

    res
      .status(200)
      .json({ quiz: updatedQuiz, message: "Quiz updated successfully", success: true });
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

const deleteQuiz = async (req, res) => {
  const { quizid: quizId } = req.params;

  try {
    const quizToDelete = await QuizModel.findById(quizId);

    if (quizToDelete.isRunning) {
      return res
        .status(400)
        .json({ message: "Cannot delete quiz that is running", success: false });
    }

    await QuizModel.deleteOne({ _id: quizId });

    res.status(200).json({ message: `Quiz with id ${quizId} deleted successfully`, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Interal server error", success: false });
  }
};

const runQuiz = async (req, res) => {
  const { quizid: quizId } = req.params;
  const quizManager = req.quizManager;

  try {
    // const quiz = await QuizModel.findById(quizId);
    const code = "123212";

    const quiz = await QuizModel.findByIdAndUpdate(quizId, { isRunning: true, code: code }).lean();

    // quiz.isRunning = true;
    // quiz.code = code;
    // await quiz.save();

    quizManager.addQuiz(quizId, { ...quiz, code });

    res.status(200).json({ quiz, code, message: "Quiz is running", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

const cancelQuiz = async (req, res) => {
  const { quizid: quizId } = req.params;
  const quizManager = req.quizManager;

  try {
    const quiz = await QuizModel.findByIdAndUpdate(quizId, { isRunning: false, code: null }).lean();

    quizManager.deleteQuiz(quizId);

    res
      .status(200)
      .json({ quiz, message: `Quiz "${quiz.quizName}" has been cancelled`, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

module.exports = { watchQuiz, getQuizes, deleteQuiz, runQuiz, cancelQuiz, startQuiz };
