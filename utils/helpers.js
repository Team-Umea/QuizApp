const axios = require("axios");

const generateUserId = () => {
  return `user_${Math.random().toString(36).substr(2, 9)}`;
};

const shuffleArray = (array) => {
  const suffledArray = [...array];

  for (let i = suffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [suffledArray[i], suffledArray[j]] = [suffledArray[j], suffledArray[i]];
  }

  return suffledArray;
};

const parseCookies = (cookieString) => {
  if (!cookieString) return null;

  return cookieString
    .split(";")
    .map((cookie) => cookie.trim())
    .reduce((acc, cookie) => {
      const [key, ...rest] = cookie.split("=");
      acc[key] = decodeURIComponent(rest.join("="));
      return acc;
    }, {});
};

const getPublicIP = async () => {
  try {
    const response = await axios.get("https://api.ipify.org?format=json");
    return response.data.ip;
  } catch (error) {
    console.error("Error fetching public IP:", error);
    return null;
  }
};

const generateCode = () => Math.floor(100000 + Math.random() * 900000).toString();

const generateRandomColor = (negativeColors) => {
  const offset = 100;
  let color;

  do {
    color = "#" + Math.floor(Math.random() * 16777215).toString(16);
  } while (isCloseToNegativeColor(color, negativeColors, offset) || isRestrictedColor(color));

  return color;
};

const isCloseToNegativeColor = (color, negativeColors, offset) => {
  const [r, g, b] = hexToRgb(color);

  for (const negColor of negativeColors) {
    const [negR, negG, negB] = hexToRgb(negColor);

    if (Math.abs(r - negR) < offset && Math.abs(g - negG) < offset && Math.abs(b - negB) < offset) {
      return true;
    }
  }

  return false;
};

const isRestrictedColor = (color) => {
  const [r, g, b] = hexToRgb(color);
  return r === g && g === b && (r === 0 || r === 255);
};

const hexToRgb = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
};

module.exports = {
  generateUserId,
  shuffleArray,
  parseCookies,
  getPublicIP,
  generateCode,
  generateRandomColor,
};
