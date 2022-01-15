import { privateBackend, publicBackend } from "../../api";
import {
  GET_PRODUCT_ROUTE,
  GET_ALL_PRODUCTS_ROUTE,
  BUY_PRODUCT_ROUTE,
} from "../../api/routes";
import * as actionsType from "./actionsType";
import { getAllProducts } from "./admin";
import { GET_USER_INFO } from "./../../api/routes/index";

export const getAllImages = (term) => async (dispatch) => {
  const response = await privateBackend.get(GET_PRODUCT_ROUTE(term));
  dispatch({ type: "UNSPLASH_API", payload: response.data.products });
};

export const changeImages = (term) => async (dispatch) => {
  const response = await publicBackend.get(
    `/search/photos?query=${term}&per_page=${20}`
  );
  dispatch({ type: "UNSPLASH_API", payload: response.data.products });
};
export const changeHomeImage = (src) => {
  localStorage.setItem("HomeTheme", src);
  return {
    type: actionsType.UPDATE_HOME_PAGE_IMAGE,
    payload: src,
  };
};
export const addImage = (src) => {
  return {
    type: actionsType.ADD_IMAGE,
    payload: src,
  };
};

export const getUserPhotos = (username) => async (dispatch) => {
  const response = await publicBackend.get(`/users/${username}/photos`);
  console.log(response);
  dispatch({ type: "INDIVISUAL_API", payload: response.data });
};

export const getUserLiked = (username) => async (dispatch) => {
  const response = await publicBackend.get(`/users/${username}/likes`);
  dispatch({ type: "LIKED_API", payload: response.data });
};
export const classification = (term) => {
  console.log(term);
  return {
    type: "CLASSIFICATION",
    payload: term,
  };
};

export const buyProduct = (id) => async (dispatch) => {
  return new Promise((resolve, reject) => {
    privateBackend
      .post(BUY_PRODUCT_ROUTE, {
        product_id: id,
      })
      .then((res) => {
        resolve(res);
        window.open(res.data.link, "_blank");
      });
  });
};

export const getUserInfo = (id) => async (dispatch) => {
  return new Promise((resolve, reject) => {
    privateBackend.get(GET_USER_INFO(id)).then((res) => {
      resolve(res);
    });
  });
};
export const updateUserInfo = (id, name, email) => async (dispatch) => {
  return new Promise((resolve, reject) => {
    privateBackend
      .put(GET_USER_INFO(id), {
        name,
        email,
      })
      .then((res) => {
        resolve(res);
      });
  });
};

export const downloadProduct = (id) => async (dispatch) => {
  return new Promise((resolve, reject) => {
    privateBackend
      .get("/products/d/" + id, {
        headers: {
          responseType: "blob",
        },
      })
      .then( (res) => {
      console.log(res.data)
      
      });
  });
};
