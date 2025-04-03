const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_APP_SECRET;
const JWT_KEY = process.env.JWT_APP_TOKEN_KEY;

const ensureAuthenticated = (req, res, next) => {
  const JWT_TOKEN = req.cookies[JWT_KEY];

  try {
    const decoded = jwt.verify(JWT_TOKEN, JWT_SECRET);

    if (!decoded) {
      return res.status(403).json({ message: "Unauthenticated", success: false });
    }

    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(403).json({
        message: "Your session has expired, please log in again to continue",
        success: false,
      });
    }

    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

const ensureAdmin = (req, res, next) => {
  const JWT_TOKEN = req.cookies[JWT_KEY];

  try {
    const decoded = jwt.verify(JWT_TOKEN, JWT_SECRET);

    if (!decoded) {
      return res.status(403).json({ message: "You do not have admin rights", success: false });
    }

    const isAdmin = decoded.isAdmin;

    if (!isAdmin) {
      return res.status(403).json({ message: "You do not have admin rights", success: false });
    }

    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(403).json({
        message: "Your session has expired, please log in again to continue",
        success: false,
      });
    }

    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

module.exports = {
  ensureAuthenticated,
  ensureAdmin,
};
