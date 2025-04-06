const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const Router = require("./routes/Router");
const { ensureAuthenticated, ensureAdmin } = require("./middlewares/auth");

require("dotenv").config();
require("./config/db");

const app = express();
const PORT = process.env.PORT || 8080;

const openCors = cors({
  origin: (_, callback) => {
    return callback(null, true);
  },
  credentials: true,
});

app.use(openCors);
app.use(cookieParser());
app.use(bodyParser.json());

app.use(Router);

app.listen(PORT, () => {
  console.log(`\x1b[36mServer is running on http://localhost:${PORT}\x1b[0m`);
});
