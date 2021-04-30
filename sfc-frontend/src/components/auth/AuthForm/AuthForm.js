import React from "react";
import { Link } from "react-router-dom";
import { Button, Form } from "semantic-ui-react";

import "./AuthForm.css";

// service
import * as service from '../../../services/sign';

const textmap = {
  login: "로그인",
  register: "회원가입",
};

const fetchSignIn = async () => {
  const post = await service.getSignIn(document.getElementById("userId").value);
  if (post.status !== 200) return;
  else if (post.status === 200) {
    window.localStorage.setItem("userInfo", JSON.stringify(post.data));
    window.location.href = "/";
  }
}

const Authform = ({ type }) => {
  const txt = textmap[type];
  return (
    <Form>
      <h3>{txt}</h3>
      <Form.Field>
        <label>ID</label>
        <input id="userId" placeholder="ID를 입력해주세요" />
      </Form.Field>

      <Form.Field>
        <label>Password</label>
        <input id="userPassword" placeholder="비밀번호를 입력해주세요" />
      </Form.Field>

      {type === "register" && (
        <Form.Field>
          <label>Check</label>
          <input placeholder="비밀번호를 다시 입력해주세요" />
        </Form.Field>
      )}

      <Button type="submit" onClick={() => fetchSignIn()}>
        {txt}
      </Button>

      <footer className="auth__another">
        {type === "login" ? (
          <Link to="/register">회원가입</Link>
        ) : (
          <Link to="/login">로그인</Link>
        )}
      </footer>
    </Form>
  );
};

export default Authform;
