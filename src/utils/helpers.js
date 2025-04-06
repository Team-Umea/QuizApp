export function hasDuplicates(array) {
  return (
    array.map((item) => item.toLowerCase()).filter((item, index) => array.indexOf(item) !== index)
      .length > 0
  );
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
