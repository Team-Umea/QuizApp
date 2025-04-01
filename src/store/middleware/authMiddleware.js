import { verifySession } from "../authSlice";

const verifyAuth = (store) => (next) => (action) => {
  if (action.type === "VERIFY_AUTH") {
    store.dispatch(verifySession());
  }

  return next(action);
};

export default verifyAuth;
