import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./index.css";
import App from "./pages/App";
import Detail from "./pages/Detail";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Route exact path="/">
        <App />
      </Route>
      <Route path="/detail/:id">
        <Detail />
      </Route>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
