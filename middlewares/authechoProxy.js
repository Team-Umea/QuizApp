const router = require("express").Router();
const { createProxyMiddleware } = require("http-proxy-middleware");

require("dotenv").config();

const APPNAME = process.env.APP_NAME;
const AUTHECHO_API_KEY = process.env.AUTHECHO_API_KEY;
const AUTHECHO_SERVER = process.env.AUTHECHO_SERVER;

router.use("/authecho", (req, _, next) => {
  req.headers["authecho-app-name"] = APPNAME;
  req.headers["authecho-app-key"] = AUTHECHO_API_KEY;

  next();
});

router.use(
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

module.exports = router;
