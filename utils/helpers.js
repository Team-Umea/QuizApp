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

module.exports = { generateUserId, shuffleArray, parseCookies, getPublicIP, generateCode };
