const express = require("express");
const app = express();
const path = require("path");
const { createProxyMiddleware } = require("http-proxy-middleware");
const ApiRouter = require("./routes/Router.cjs");

require("dotenv").config();
require("./config/db.cjs");

const PORT = process.env.PORT;
const APPNAME = process.env.APP_NAME;
const AUTHECHO_API_KEY = process.env.AUTHECHO_API_KEY;
const AUTHECHO_SERVER = process.env.AUTHECHO_SERVER;

const REACT_DEV_SERVER = "http://localhost:5173";
const isRunningInProd = process.env.NODE_ENV === "production";

app.use("/authecho", (req, _, next) => {
  req.headers["authecho-app-name"] = APPNAME;
  req.headers["authecho-app-key"] = AUTHECHO_API_KEY;

  next();
});

app.use(
  "/authecho",
  createProxyMiddleware({
    target: AUTHECHO_SERVER,
    changeOrigin: true,
    pathRewrite: (_, req) => {
      return req.originalUrl.replace(/^\/authecho/, "");
    },
    onProxyReq: (proxyReq, req) => {
      const cookieHeader = req.headers.cookie;
      if (cookieHeader) {
        proxyReq.setHeader("Cookie", cookieHeader);
      }
    },
    onProxyRes: (proxyRes, _, res) => {
      const setCookieHeaders = proxyRes.headers["set-cookie"];
      if (setCookieHeaders) {
        if (Array.isArray(setCookieHeaders)) {
          setCookieHeaders.forEach((cookie) => {
            res.setHeader("Set-Cookie", cookie);
          });
        } else {
          res.setHeader("Set-Cookie", setCookieHeaders);
        }
      }
    },
  })
);

app.use("/api", ApiRouter);

if (!isRunningInProd) {
  app.use(
    "/",
    createProxyMiddleware({
      target: REACT_DEV_SERVER,
      changeOrigin: true,
      ws: true,
      logLevel: "debug",
    })
  );
}

if (isRunningInProd) {
  console.log("prod");

  app.use(express.static(path.join(__dirname, "dist")));

  app.get("*", (req, res) => {
    if (req.accepts("html")) {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    }
  });
}

app.listen(PORT, () => {
  console.log(`\x1b[36mServer is running on http://localhost:${PORT}\x1b[0m`);
});
