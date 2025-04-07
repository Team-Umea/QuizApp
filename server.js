const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const ApiRouter = require("./routes/ApiRouter");
const authechoProxy = require("./middlewares/authechoProxy");
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

app.use(authechoProxy);

app.use(express.json());

app.use("/api", ensureAuthenticated, ensureAdmin, ApiRouter);

app.listen(PORT, () => {
  console.log(`\x1b[36mServer is running on http://localhost:${PORT}\x1b[0m`);
});
