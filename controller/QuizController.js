const QuizModel = require("../models/QuizModel");
const { shuffleArray, generateCode } = require("../utils/helpers");

const startPublicQuizes = async (quizManager) => {
  try {
    const quizes = await QuizModel.find({ isPublic: true }).lean();

    quizes.forEach((quiz) => {
      quizManager.addQuiz(String(quiz._id), {
        ...quiz,
        questions: shuffleArray(quiz.questions),
        _id: String(quiz._id),
      });
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

const toggleQuizVisibility = async (req, res) => {
  const { quizid: quizId } = req.params;
  const quizManager = req.quizManager;

  try {
    const quiz = await QuizModel.findById(quizId);

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found", success: false });
    }

    if (quiz.isPublic) {
      quizManager.deleteQuiz(quizId);
    } else {
      quizManager.addQuiz(quizId, { ...quiz._doc, isPublic: true });
    }

    quiz.isPublic = !quiz.isPublic;

    await quiz.save();

    res.status(200).json({ message: "Quiz visibility toggled", success: true, quiz });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", success: false });
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

const getQuizById = async (req, res) => {
  const { quizid: quizId } = req.params;

  try {
    const quiz = await QuizModel.findById(quizId).lean();

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found", success: false });
    }

    return res.status(200).json({ quiz, success: true });
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
    const code = generateCode();

    const quiz = await QuizModel.findById(quizId);

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found", success: false });
    }

    quiz.isRunning = true;
    quiz.isLaunched = false;
    quiz.code = code;

    await quiz.save();

    quizManager.addQuiz(quizId, { ...quiz._doc, questions: shuffleArray(quiz.questions), code });

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
    const quiz = await QuizModel.findById(quizId);

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found", success: false });
    }

    quiz.isRunning = false;
    quiz.isLaunched = false;
    quiz.code = null;

    await quiz.save();

    quizManager.deleteQuiz(quizId);

    res
      .status(200)
      .json({ quiz, message: `Quiz "${quiz.quizName}" has been cancelled`, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

const launchQuiz = async (req, res) => {
  const { quizid: quizId } = req.params;
  const quizManager = req.quizManager;

  try {
    const quiz = await QuizModel.findById(quizId);

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found", success: false });
    }

    if (!quiz.isRunning) {
      return res.status(400).json({ message: "Start quiz to launch", success: false });
    }

    quiz.isLaunched = true;
    await quiz.save();

    quizManager.launchQuiz(quizId);

    res.status(200).json({ message: "Quiz launched", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

const getQuizResult = async (req, res) => {
  const { quizid: quizId } = req.params;

  try {
    const quiz = await QuizModel.findById(quizId);

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found", success: false });
    }

    res.status(200).json({ result: quiz.result, message: "Quiz launched", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

module.exports = {
  watchQuiz,
  toggleQuizVisibility,
  getQuizes,
  getQuizById,
  deleteQuiz,
  runQuiz,
  cancelQuiz,
  startPublicQuizes,
  launchQuiz,
  getQuizResult,
};
