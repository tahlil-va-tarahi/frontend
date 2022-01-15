
import {combineReducers} from 'redux'
import UnsplashReducer from './UnsplashReducer'
import UiReducer from './UiReducer'
import classificationName from './ClassificationName'
import UIAnimation from './UIAnimation'
import auth from './auth';
import adminReducer from './admin';
export default combineReducers({
    UnsplashReducer : UnsplashReducer,
    UiReducer:UiReducer,
    classificationName:classificationName,
    UIAnimation:UIAnimation,
    auth,
    admin : adminReducer
    
})