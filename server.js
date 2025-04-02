const express = require("express");
const cors = require("cors");
const Router = require("./routes/Router");
const ProxyRouter = require("./routes/ProxyRouter");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;

const openCors = cors({
  origin: (_, callback) => {
    return callback(null, true);
  },
  credentials: true,
});

app.use(openCors);

app.use(ProxyRouter);
app.use(Router);

app.listen(PORT, () => {
  console.log(`\x1b[36mServer is running on http://localhost:${PORT}\x1b[0m`);
});
