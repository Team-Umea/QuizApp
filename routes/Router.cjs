const router = require("express").Router();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const { watchQuiz } = require("../controllers/QuizController.cjs");
const { ensureAuthenticated, ensureAdmin } = require("../middlewares/auth.cjs");

router.use(cookieParser());
router.use(bodyParser.json());

router.use(ensureAuthenticated, ensureAdmin);

router.put("/watchQuiz", watchQuiz);

module.exports = router;
