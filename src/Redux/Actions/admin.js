import {
  GET_ALL_USERS_ROUte,
  GET_ALL_PRODUCTS_ROUTE,
  DELETE_USER_ROUTE,
  DELETE_PRODUCT_ROUTE,
  GET_PRODUCT_ROUTE,
  UPDATE_PRODUCT,
  GET_IDN_PRODUCT,
  GET_ALL_SALES,
} from "../../api/routes";
import { privateBackend } from "./../../api/index";
import * as TYPES from "./TYPES";
import { MAKE_PRODUCT_ROUTE } from "./../../api/routes/index";
export const getAllUsers = () => {
  return async (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      privateBackend
        .get(GET_ALL_USERS_ROUte)
        .then((result) => {
          dispatch({
            type: TYPES.GEL_ALL_USERS,
            users: result.data.users,
          });
          resolve();
        })
        .catch((err) => {
          reject(err.response?.data?.error);
        });
    });
  };
};

export const getAllProducts = () => {
  return async (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      privateBackend
        .get(GET_ALL_PRODUCTS_ROUTE)
        .then((result) => {
          dispatch({
            type: TYPES.GET_ALL_PRODUCTS,
            products: result.data.products,
          });
          resolve();
        })
        .catch((err) => {
          reject(err.response?.data?.error);
        });
    });
  };
};

export const deleteUser = (id) => {
  return async (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      privateBackend
        .delete(DELETE_USER_ROUTE(id))
        .then((result) => {
          dispatch(getAllUsers());
          resolve();
        })
        .catch((err) => {
          reject(err.response?.data?.error);
        });
    });
  };
};

export const addProduct = (data) => {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("category_id", data.category_id);
  formData.append("description", data.description);
  formData.append("image", data.image);
  formData.append("price", data.price);

  return async (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      privateBackend
        .post(MAKE_PRODUCT_ROUTE, formData, {
          headers: {
            ...privateBackend.defaults.headers,
            "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
          },
        })
        .then((result) => {
          dispatch(getAllProducts());
          resolve();
        })
        .catch((err) => {
          reject(err.response?.data?.error);
        });
    });
  };
};

export const deleteProduct = (id) => {
  return async (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      privateBackend
        .delete(DELETE_PRODUCT_ROUTE(id))
        .then((result) => {
          dispatch(getAllProducts());
          resolve();
        })
        .catch((err) => {
          reject(err.response?.data?.error);
        });
    });
  };
};

export const getProductInfo = (id) => {
  return async (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      privateBackend
        .get(GET_IDN_PRODUCT(id))
        .then((result) => {
          resolve(result.data);
        })
        .catch((err) => {
          reject(err.response?.data?.error);
        });
    });
  };
};

export const updateProduct = (id, data) => {
  const formData = new FormData();

  if (data.title) formData.append("title", data.title);

  if (data.category_id)
  formData.append("category_id", data.category_id);

  if (data.description)
  formData.append("description", data.description);

  if (data.price)
  formData.append("price", data.price);

  return async (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      privateBackend
        .post(UPDATE_PRODUCT(id), formData, {
          headers: {
            ...privateBackend.defaults.headers,
            "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
          },
        })
        .then((result) => {
          dispatch(getAllProducts());
          resolve();
        })
        .catch((err) => {
          reject(err.response?.data?.error);
        });
    });
  };
};

export const getAllSales = () => {
  return async (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      privateBackend
        .get(GET_ALL_SALES)
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err.response?.data?.error);
        });
    });
  };
};
