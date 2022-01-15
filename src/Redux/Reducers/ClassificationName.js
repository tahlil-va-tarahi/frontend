import * as TYPES from '../Actions/TYPES'
const initialState = {
    term:''
};

const classification = (state = initialState, action) => {
  switch (action.type) {
    case "CLASSIFICATION": {
      return { term :action.payload};
    }

   
    default:
      return state;
  }
};
export default classification;
