const initialState = {
  token: "" || localStorage.getItem("token"),
  isLoggedIn: localStorage.getItem("token") ? true : false,
  user_id: "" || localStorage.getItem("user_id"),
  name: "" || localStorage.getItem("name"),
};

const loginReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "LOG_IN":
      return {
        token: payload,
        user_id: payload.user_id,
        name: payload.name,
        isLoggedIn: true,
      };

    case "LOG_OUT":
      return {
        token: "",
        isLoggedIn: false,
      };

    default:
      return state;
  }
};

export default loginReducer;

export const loginRed = ({ token, user_id, name }) => {
  return { type: "LOG_IN", payload: { token, user_id, name } };
};

export const logoutRed = () => {
  return { type: "LOG_OUT" };
};
