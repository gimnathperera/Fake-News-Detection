import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Modal from "react-modal";

Modal.setAppElement("#root");

ReactDOM.render(
  <App />,
  document.getElementById("root")
);
