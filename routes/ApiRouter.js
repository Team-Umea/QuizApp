const router = require("express").Router();
const {
  runQuiz,
  cancelQuiz,
  watchQuiz,
  deleteQuiz,
  getQuizes,
  toggleQuizVisibility,
} = require("../controller/QuizController");

router.get("/quizes", getQuizes);

router.post("/runquiz/:quizid", runQuiz);
router.post("/cancelquiz/:quizid", cancelQuiz);

router.put("/watchquiz", watchQuiz);
router.put("/togglequizvisibility/:quizid", toggleQuizVisibility);

router.delete("/quiz/:quizid", deleteQuiz);

module.exports = router;
