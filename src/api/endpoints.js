export const SERVER_URL = "http://localhost:3009";
export const QUIZ_SERVER_URL = "http://localhost:3009";

export const AUTHECHO_ENDPOINTS = {
  REQUESTCODE: `${SERVER_URL}/authecho/app/requestcode`,
  VERIFYCODE: `${SERVER_URL}/authecho/app/verifycode`,
  VALIDATEQUESTION: `${SERVER_URL}/authecho/app/validatequestion`,
  SIGNIN: `${SERVER_URL}/authecho/app/signin`,
  AUTHENTICATE: `${SERVER_URL}/authecho/app/authenticate`,
  SIGNOUT: `${SERVER_URL}/authecho/app/signout`,
  VERIFYSESSION: `${SERVER_URL}/authecho/app/verifysession`,
  TRACKACTIVITY: `${SERVER_URL}/authecho/app/activity`,
};

export const API_ENDPOINTS = {
  QUIZ: `${QUIZ_SERVER_URL}/api/quiz`,
  WATCHQUIZ: `${QUIZ_SERVER_URL}/api/watchquiz`,
  TOGGLEQUIZVISIBILITY: `${QUIZ_SERVER_URL}/api/togglequizvisibility`,
  GETQUIZES: `${QUIZ_SERVER_URL}/api/quizes`,
  RUNQUIZ: `${QUIZ_SERVER_URL}/api/runquiz`,
  CANCELQUIZ: `${QUIZ_SERVER_URL}/api/cancelquiz`,
};
