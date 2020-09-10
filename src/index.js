import React from "react";
import ReactDOM from "react-dom";

// import App from "./App";
import MockIntSession from './components/MockIntSession';

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <MockIntSession />
  </React.StrictMode>,
  rootElement
);
