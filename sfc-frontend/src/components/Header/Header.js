import React from "react";
import axios from "axios";
import { Dropdown, Icon, Menu, Button, Modal } from "semantic-ui-react";
import { Link } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./Header.css";

// 모든 토스트 제거
const dismissAll = () => toast.dismiss();
const exampleReducer = (state, action) => {
  // 토스트 클릭 -> 모달 이벤트!
  switch (action.type) {
    case "close":
      return { open: false };
    case "open": {
      dismissAll(); // 모두 닫기
      return { open: true, size: action.size, data: action.data };
    }

    default:
      throw new Error("Unsupported action...");
  }
};

// 스케쥴 정산하러 가즈아~!
const fetchExcute = (data, account) => {
  // console.log(data);
  const options = {
    method: "PUT",
    url: `http://3.35.6.3:3000/api/alert`,
    data: {
      alert_log_id: data["_id"],
      status: 1,
      myAccount: account,
    },
  };

  axios
    .request(options)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => console.log(err));
};

const Header = () => {
  const [state, dispatch] = React.useReducer(exampleReducer, {
    open: false,
    size: undefined,
    data: undefined,
  });
  const { open, size, data } = state;

  // status 가 0인 알람, 최근순 불러오기!! -> 그걸 Toast로 띄워주기!
  const fetchAlertLog = () => {
    const userInfo = JSON.parse(window.localStorage.userInfo);
    axios
      .get(`http://3.35.6.3:3000/api/alert/${userInfo.result.userId}`)
      .then((res) => {
        res.data.result.map((data) => {
          const toastStr = `${data.fromUserId}님과 함께한 ${
            data.memo
          }스케쥴 **${parseInt(data.amount)}원** 이체해야합니다!`;
          toast(String(toastStr), {
            pauseOnFocusLoss: true,
            closeButton: true,
            closeOnClick: true,
            onClick: () => dispatch({ type: "open", size: "mini", data: data }),
            // onClick: () => fetchExcute(data, userInfo.result.account)
          });
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Modal
        size={size}
        open={open}
        onClose={() => dispatch({ type: "close" })}
      >
        <Modal.Header>이체하기</Modal.Header>
        <Modal.Content>
          <p>
            {data && data.fromUserId}에게
            {data && parseInt(data.amount)}원 이체를 실행하시겠습니까?
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => dispatch({ type: "close" })}>
            No
          </Button>
          <Button positive onClick={() => {
            dispatch({ type: 'close' });
            fetchExcute(data, JSON.parse(window.localStorage.userInfo).result.account);
            toast.success("이체가 완료 되었습니다!!");
          }}>
            Yes
          </Button>
        </Modal.Actions>
      </Modal>

      <ToastContainer />
      <div className="header__">
        <div className="header__wrapper">
          <div className="header__hamburger">
            <Dropdown icon="align justify" size="large">
              <Dropdown.Menu>
                <Dropdown.Item text="Logout" />
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="header__right">
            <Icon
              name="bell"
              size="large"
              onClick={() => {
                fetchAlertLog();
              }}
            />
          </div>
        </div>

        <Menu pointing secondary>
          <Menu.Item name="profile" position="left">
            <Link to="/profile">
              <Icon name="user" />
              profile
            </Link>
          </Menu.Item>
          <Menu.Item name="calendar">
            <Link to="/">
              <Icon name="calendar" />
              calendar
            </Link>
          </Menu.Item>
          <Menu.Item name="group" position="right">
            <Link to="/group">
              <Icon name="group" />
              group
            </Link>
          </Menu.Item>
        </Menu>
      </div>
      <div className="spacer" />
    </>
  );
};

export default Header;
