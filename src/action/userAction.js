import backendAPI from "../apis/userApi";
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_SIGN_UP_FAIL,
  USER_SIGN_UP_REQUEST,
  USER_SIGN_UP_SUCCESS,
} from "../constants/userConstants";

const userLogin = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const { data } = await backendAPI.post("/users/login", { email, password });
    console.log(data);

    localStorage.setItem("userInfo", JSON.stringify(data));

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
  } catch (err) {
    const error = err.response ? err.response.message.data : err.message;
    dispatch({ type: USER_LOGIN_FAIL, payload: error });
  }
};

const userSignUp =
  (firstName, lastName, mobile, password, email) => async (dispatch) => {
    try {
      dispatch({ type: USER_SIGN_UP_REQUEST });
      console.log(firstName, lastName, mobile, password, email);

      const { data } = await backendAPI.post("/users/signup", {
        firstName,
        lastName,
        mobile,
        password,
        email,
      });

      dispatch(userLogin(email, password));

      dispatch({ type: USER_SIGN_UP_SUCCESS, payload: data });
    } catch (error) {
      const err = error.response ? error.response : error.response.data.message;

      dispatch({ type: USER_SIGN_UP_FAIL, payload: error });
    }
  };

export { userLogin, userSignUp };
