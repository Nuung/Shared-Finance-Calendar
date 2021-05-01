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

// 로그인 요청 
const fetchSign = async (type) => {

  if (type === "register") {
    // name: String,
    // userId: { type: String, unique: true },
    // userPassword: String,
    // phoneNumber: String,
    // account: { type: String, unique: true },

    // req.body
    const data = {
      name: document.getElementById("name").value,
      userId: document.getElementById("userId").value,
      userPassword: document.getElementById("userPassword").value,
      phoneNumber: document.getElementById("phoneNumber").value,
      account: document.getElementById("account").value,
      birth: document.getElementById("birth").value,
    }

    const result = await service.getSignUp(data);
    if (result.status !== 201) console.log("error");
    else if (result.status === 201) {
      window.localStorage.setItem("userInfo", JSON.stringify(result.data));
      window.location.href = "/";
    }
  }
  else {
    const result = await service.getSignIn(document.getElementById("userId").value);
    if (result.status !== 200) console.log("error");
    else if (result.status === 200) {
      window.localStorage.setItem("userInfo", JSON.stringify(result.data));
      window.location.href = "/";
    }
  }
}

// 인증 번호 요청
const fetchAuthToken = async () => {
  // req.body
  const data = {
    phoneNumber: document.getElementById("phoneNumber").value,
    name: document.getElementById("name").value,
    birth: document.getElementById("birth").value,
  }

  // fetch main
  const result = await service.getAuthToken(data);
  if (result.status !== 201) console.log("error");
  else if (result.status === 201) {
    document.getElementById("auth_token").value = result.data['dataBody']['CRTF_UNQ_NO'];
  }
}

// 인증 번호 확인 
const fetchAuthTokenChk = async () => {
  const data = {
    birth: document.getElementById("birth").value,
    auth_number: "123123",
    auth_token: document.getElementById("auth_token").value
  }

  // fetch main
  const result = await service.getAuthTokenChk(data);
  if (result.status !== 201) console.log("error");
  else if (result.status === 201) {
    const { dataBody } = result.data;
    document.getElementById("account").value = dataBody['REPT_FA'][0]['CUS_USG_ACNO'];
  }
}

const Authform = ({ type }) => {
  const txt = textmap[type];
  return (
    <Form>
      <h3>{txt}</h3>

      {type === "register" &&
        <Form.Field>
          <label>Name</label>
          <input id="name" placeholder="이름을 입력해주세요" />
        </Form.Field>
      }
      {type === "register" &&
        <Form.Field>
          <label>Phone Number</label>
          <input id="phoneNumber" placeholder="휴대폰 번호를 입력해 주세요" />
        </Form.Field>
      }
      {type === "register" &&
        <Form.Field>
          <label>Birth Number</label>
          <input id="birth" placeholder="생년월일 ex)950704" />
        </Form.Field>
      }
      {type === "register" &&
        <Form.Field className="auth__form__btn">
          <Button type="button" onClick={() => fetchAuthToken()}>인증 번호 받기</Button>
        </Form.Field>
      }
      {type === "register" &&
        <Form.Field>
          <input id="auth_token" placeholder="인증 번호 받기를 눌러주세요!" />
        </Form.Field>
      }
      {type === "register" &&
        <Form.Field className="auth__form__btn">
          <Button type="button" onClick={() => fetchAuthTokenChk()}>인증 번호 확인</Button>
        </Form.Field>
      }
      {type === "register" &&
        <Form.Field>
          <label>Account Number</label>
          <input id="account" placeholder="계좌 번호를 입력해 주세요" />
        </Form.Field>
      }

      <Form.Field>
        <label>ID</label>
        <input id="userId" placeholder="ID를 입력해주세요" />
        <label>Password</label>
        <input id="userPassword" placeholder="비밀번호를 입력해주세요" />
      </Form.Field>

      {type === "register" &&
        <Form.Field>
          <label>Check Password</label>
          <input placeholder="비밀번호를 다시 입력해주세요" />
        </Form.Field>
      }

      <Form.Field className="auth__form__btn">
        <Button type="submit" onClick={() => fetchSign(type)}>
          {txt}
        </Button>
      </Form.Field>

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
