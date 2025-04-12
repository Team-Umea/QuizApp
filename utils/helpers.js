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

module.exports = { generateUserId, shuffleArray, parseCookies };
