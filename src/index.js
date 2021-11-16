import React from "react";
import ReactDOM from "react-dom";
import App from "./views/App";
import reportWebVitals from "./reportWebVitals";
import { createStore } from "redux";
import { Provider } from "react-redux";
import middleware from "./state/middleware";
import reducers from "./state/storeReducers";
import "./index.css";

const store = createStore(reducers, middleware);

ReactDOM.render(
    <React.StrictMode className="index">
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
