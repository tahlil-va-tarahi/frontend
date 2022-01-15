import React from "react";
import ReactDom from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import Reducers from "./Redux/Reducers";
import reduxThunk from "redux-thunk";
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore( Reducers, composeEnhancers(applyMiddleware(reduxThunk)));
ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,

  document.querySelector("#root")
);
