const router = require("express").Router();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

router.use(cookieParser());
router.use(bodyParser.json());

module.exports = router;
