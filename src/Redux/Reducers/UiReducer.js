import * as actionsType from "../Actions/actionsType";
import image from "../../assets/alex-glebov-uiTEV1jvlGc-unsplash.jpg";
import mount from "../../assets/jan-valecka-SRJkK4rtZvs-unsplash.jpg";
import d from "../../assets/sayan-nath-NYIQPdMWN84-unsplash.jpg";
import v from "../../assets/karsten-winegeart-QtDaxPzhfAk-unsplash.jpg"
import alex from "../../assets/alex-tXYg4Zx7kSU-unsplash.jpg"
import _  from 'lodash';
const setedImage = localStorage.getItem("HomeTheme");
const initialState = {
  images: [mount,d,v,alex],
  backgrundImage: setedImage || image,
};
const UiReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsType.UPDATE_HOME_PAGE_IMAGE:{
      const newImages = state.images;
      _.remove(newImages,(src)=>src===action.payload)
      newImages.unshift(action.payload)
      return {
        ...state,
        images:newImages,
        backgrundImage: action.payload
      };

    }
    case actionsType.ADD_IMAGE:
      const newImages = [...state.images];
      newImages.unshift(action.payload);
      return {
        ...state,
        images:newImages
      }
    default:
      return state;
  }
};
export default UiReducer;
