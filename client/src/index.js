import React from "react";
import ReactDOM from "react-dom";
import "./CSS/index.css";
import App from "./Components/App";
import rootReducer from "./store/reducers/rootReducer";

import * as serviceWorker from "./serviceWorker";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

const provider = (
  <Provider store={store}>
    <App store={store} />
  </Provider>
);
ReactDOM.render(provider, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

export default store;
