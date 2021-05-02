import React from "react";
import { Route } from "react-router-dom";
import "./normalize.css";
import "semantic-ui-css/semantic.min.css";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import CalendarPage from "./pages/CalendarPage";
import GroupInfoPage from "./pages/GroupInfoPage";

function App() {
  return (
    <div className="App">
      <Route component={LoginPage} path={"/login"} />
      <Route component={RegisterPage} path={"/register"} />

      <Route component={CalendarPage} path={"/"} exact />
      <Route component={ProfilePage} path={"/profile"} />
      <Route component={GroupInfoPage} path={"/group"} />
    </div>
  );
}

export default App;
