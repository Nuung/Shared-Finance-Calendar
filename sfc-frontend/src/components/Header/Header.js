import React from "react";
import { Icon, Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

import "./Header.css";

const Header = () => {
  return (
    <>
      <div className="header">
        <div className="header__wrapper">
          <div className="header__hamburger">
            <Icon
              name="align justify"
              size="large"
              onClick={() => console.log("메뉴가 열립니다")}
            />
          </div>
          <div class="header__right">
            <Icon
              name="bell"
              size="large"
              onClick={() => console.log("벨이 울립니다")}
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
