const router = require("express").Router();
const { runQuiz, cancelQuiz } = require("../controller/QuizController");

router.post("/runquiz/:quizid", runQuiz);
router.post("/cancelquiz/:quizid", cancelQuiz);

module.exports = router;
