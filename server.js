const express = require("express");
const http = require("http");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const ApiRouter = require("./routes/ApiRouter");
const authechoProxy = require("./middlewares/authechoProxy");
const quizSocket = require("./sockets/quizSocket");
const { ensureAuthenticated, ensureAdmin } = require("./middlewares/auth");
const { startPublicQuizes } = require("./controller/QuizController");

require("dotenv").config();
require("./config/db");

const app = express();
const PORT = process.env.PORT || 8080;
const server = http.createServer(app);
const quizManager = quizSocket(server);

startPublicQuizes(quizManager);

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

app.get("/", (_, res) => res.send("Welcome to the quizio api"));

app.use("/api", (req, _, next) => {
  req.quizManager = quizManager;
  next();
});

app.use("/api", ensureAuthenticated, ensureAdmin, ApiRouter);

server.listen(PORT, () => {
  console.log(`\x1b[36mServer is running on http://localhost:${PORT}\x1b[0m`);
});
