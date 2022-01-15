
import * as TYPES from "../Actions/TYPES";

const init = {
  isAuthenticated: Boolean(JSON.parse(localStorage.getItem('auth'))) || false,
  user: null,
  isAdmin: Boolean(JSON.parse(localStorage.getItem('isAdmin'))) || false,
};
const auth = (state = init, action) => {
  switch (action.type) {

 
    case TYPES.LOG_USER_IN:
      localStorage.setItem("auth", JSON.stringify(action.token));
      localStorage.setItem("isAdmin", JSON.stringify(action.user.email === 'admin@admin.admin'));
      localStorage.setItem("id", JSON.stringify(action.user.id));
      return {
        ...state,
        isAuthenticated: true,
        user: action.user,
        isAdmin:action.user.email === 'admin@admin.admin'
      };

    case TYPES.LOG_USER_OUT:
    case TYPES.UNATHORIZED:
      localStorage.removeItem("auth");
      localStorage.removeItem("isAdmin");

      return {
        ...state,
        isAuthenticated: false,
        isAdmin:false,
      };
    case TYPES.GET_USER_INFORMATION:
      return {
        ...state,
        user: action.user,
        isAdmin:action.user.email === 'admin@admin.admin'
      };
    case TYPES.REGISTER_USER:
      localStorage.setItem("auth", JSON.stringify(action.token));
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;

  }
};

export default auth;
