import * as TYPES from "./TYPES";
import { LOGIN_ROUTE, LOGOUT_ROUTE, REGISTER_ROUTE } from "../../api/routes";
import history from "../../history";
import { publicBackend, privateBackend } from "./../../api/index";

export const unAthorized = (message) => {
  history.replace("/login");
  return {
    type: TYPES.UNATHORIZED,
  };
};

export const loginUser = (data) => {

  return async (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      publicBackend
        .post(LOGIN_ROUTE, data)
        .then((result) => {
          dispatch({
            type: TYPES.LOG_USER_IN,
            token: result.data.token,
            user: result.data.user ,
          });
          resolve();
        })
        .catch((err) => {
          reject(err.response?.data?.error);
        });
    });
  };
};

export const logUserOut = () => {
  return async (dispatch, getState) => {
    await privateBackend
      .post(LOGOUT_ROUTE, {})
      .catch((err) => console.log(err.response));

    history.replace("/login");
    dispatch({
      type: TYPES.LOG_USER_OUT,
    });
  };
};
export const signUpUser = (data) => async (dispath) => {
  return new Promise((resolve, reject) => {
    publicBackend
      .post(REGISTER_ROUTE, data)
      .then((result) => {
        dispath({
          type: TYPES.REGISTER_USER,
          token: result.data?.token || null,
          user: result.data?.user || {},
        });

        resolve();
      })
      .catch((err) => {
        reject(err.response?.data?.error.email[0]);
      });
  });
};

export const  payment = ()=>{
  
}