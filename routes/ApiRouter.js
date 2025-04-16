const router = require("express").Router();
const {
  runQuiz,
  cancelQuiz,
  watchQuiz,
  deleteQuiz,
  getQuizes,
  toggleQuizVisibility,
  launchQuiz,
  getQuizResult,
  getQuizById,
} = require("../controller/QuizController");

router.get("/quizes", getQuizes);
router.get("/quiz/:quizid", getQuizById);
router.get("/quizresult/:quizid", getQuizResult);

router.post("/runquiz/:quizid", runQuiz);
router.post("/cancelquiz/:quizid", cancelQuiz);
router.post("/launchquiz/:quizid", launchQuiz);

router.put("/watchquiz", watchQuiz);
router.put("/togglequizvisibility/:quizid", toggleQuizVisibility);

router.delete("/quiz/:quizid", deleteQuiz);

module.exports = router;
