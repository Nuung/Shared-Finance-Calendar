import React from "react";
import { Link } from "react-router-dom";

import "./AuthTemplate.css";

const AuthTemplate = ({ children }) => {
  return (
    <div className={`auth__template__${children.props.type}`}>
      <div className="auth__float-box">
        <Link to="/" className="auth__brand">
          차금리차차차
        </Link>
        {children}
      </div>
    </div>
  );
};

export default AuthTemplate;
