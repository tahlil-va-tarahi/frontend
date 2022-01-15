const initialState = {
    homeToolbar:null
};

const UIAnimation = (state = initialState, action) => {
  switch (action.type) {
    case "HOME_TOOLBAR": {
      return {  homeToolbar :action.payload};
    }

    default:
      return state;
  }
};
export default UIAnimation;
