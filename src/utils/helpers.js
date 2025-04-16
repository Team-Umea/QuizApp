export function hasDuplicates(array) {
  const lowercased = array.map((item) => item.toLowerCase());
  return lowercased.filter((item, index) => lowercased.indexOf(item) !== index).length > 0;
}

export function extractEndValues(obj, endValue) {
  const endValues = [];

  Object.values(obj).forEach((nestedObj) => {
    const findMessages = (nested) => {
      if (typeof nested === "object" && nested !== null) {
        Object.keys(nested).forEach((nestedKey) => {
          if (nestedKey === endValue) {
            endValues.push(nested[nestedKey]);
          } else {
            findMessages(nested[nestedKey]);
          }
        });
      }
    };

    findMessages(nestedObj);
  });

  return endValues;
}

export function generateID(array) {
  if (array.length === 0) {
    return "1";
  }
  return String(Math.max(...array.map((item) => parseInt(item.id))) + 1);
}

export function generateQuizName(quizes = []) {
  const suffixes = quizes
    .filter((quiz) => quiz.quizName.trim().toLowerCase().startsWith("quiz"))
    .map((quiz) => {
      const suffix = quiz.quizName.replace(/^\D+/g, "");
      return suffix ? parseInt(suffix) : 0;
    });

  let suffix = 1;
  while (suffixes.includes(suffix)) {
    suffix++;
  }

  return `Quiz${suffix}`;
}

export function safeParseJSON(str) {
  try {
    const parsed = JSON.parse(str);
    return parsed;
  } catch (error) {
    return null;
  }
}

export function shuffleArray(array) {
  const suffledArray = [...array];

  for (let i = suffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [suffledArray[i], suffledArray[j]] = [suffledArray[j], suffledArray[i]];
  }

  return suffledArray;
}

export const isStrNumber = (str) => str.split("").every((char) => parseInt(char));
