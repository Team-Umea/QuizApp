const router = require("express").Router();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const { watchQuiz, getQuizes } = require("../controllers/QuizController.cjs");
const { ensureAuthenticated, ensureAdmin } = require("../middlewares/auth.cjs");

router.use(cookieParser());
router.use(bodyParser.json());

router.use(ensureAuthenticated, ensureAdmin);

router.get("/quizes", getQuizes);
router.put("/watchquiz", watchQuiz);

module.exports = router;
