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

module.exports = { generateUserId, shuffleArray };
