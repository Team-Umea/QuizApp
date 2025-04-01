const express = require("express");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;

app.get("/", (_, res) => {
  res.send("Hello and welcome to this quiz app server");
});

app.listen(PORT, () => {
  console.log(`\x1b[36mServer is running on http://localhost:${PORT}\x1b[0m`);
});
