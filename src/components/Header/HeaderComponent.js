import {
  Avatar,
  Badge,
  Button,
  Popover,
  Menu,
  Modal,
  Space,
  Divider,
  message,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import "./HeaderComponent.css";
import logo from "../../assets/images/logo.png";

import {
  ShoppingCartOutlined,
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { localLanguage, routerConstants } from "../../utils/constants";
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const HeaderComponent = () => {
  const ref = useRef();
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const [messageApi, contextHolder] = message.useMessage();
  const [messageApi1, contextHolder1] = message.useMessage();

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const obj = JSON.parse(localStorage.getItem(localLanguage.ACCESS_KEY));
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const navigate = useNavigate();
  const storeData = useSelector((state) => {
    return state.shoppingCartReducer;
  });
  const handlelogout = () => {
    hideModal();
    localStorage.removeItem(localLanguage.ACCESS_KEY);
    setTimeout(() => {
      navigate(routerConstants.HOME_ROUTE);
    }, 1000);

    showStatus();
  };
  const showStatus = () => {
    messageApi1.open(
      {
        type: "warning",
        content: "You are now logged out",
      },
      1.5
    );
  };
  const handlelogin = () => {
    navigate(routerConstants.LOGIN_ROUTE);
  };
  const items = [
    <div className="options" style={{ textAlign: "center" }}>
      <Link
        onClick={toggleCollapsed}
        style={{ color: "#334d4d" }}
        to={routerConstants.HOME_ROUTE}
      >
        {localLanguage.HOME}
      </Link>
    </div>,
    <div className="options" style={{ textAlign: "center" }}>
      <Link
        onClick={toggleCollapsed}
        to={routerConstants.ABOUT_ROUTE}
        style={{ color: "#334d4d" }}
      >
        {localLanguage.ABOUT}
      </Link>
    </div>,
    <div className="options" style={{ textAlign: "center" }}>
      <Link
        onClick={toggleCollapsed}
        to={routerConstants.PRODUCTS_ROUTE}
        style={{ color: "#334d4d" }}
      >
        {localLanguage.PRODUCTS}
      </Link>
    </div>,
    <div className="options" style={{ textAlign: "center" }}>
      <Link
        onClick={toggleCollapsed}
        to={routerConstants.SHOPPING_CART_ROUTE}
        style={{ color: "#334d4d" }}
      >
        <Badge count={storeData?.totalCount}>
          <Avatar
            style={{ color: "black", backgroundColor: "white" }}
            icon={<ShoppingCartOutlined />}
          />
        </Badge>
      </Link>
    </div>,
    <div className="options" onClick={toggleCollapsed}>
      {obj?.token ? (
        <Button style={{ width: "100%" }} onClick={showModal}>
          {localLanguage.LOGOUT}
        </Button>
      ) : (
        <Button style={{ width: "100%" }} onClick={handlelogin}>
          {localLanguage.LOGIN}
        </Button>
      )}
    </div>,
  ];
  return (
    <>
      {contextHolder1}
      {contextHolder}
      <Modal
        style={{}}
        footer={[
          <div>
            <Button onClick={hideModal}>{localLanguage.CANCEL}</Button>
            <Button onClick={handlelogout} type="primary">
              {localLanguage.CONFIRM}
            </Button>
          </div>,
        ]}
        open={open}
        onOk={hideModal}
        onCancel={hideModal}
      >
        {localLanguage.LOGIN_STATEMENT}
      </Modal>
      <div className="brand">
        <label>
          <img
            style={{ height: "50px", width: "200px" }}
            src={logo}
            alt="logo"
            className="Logo"
          />
        </label>
      </div>
      {screenWidth >= 550 ? (
        <div className="menu" style={{}}>
          <label className="options">
            <Link style={{ color: "#334d4d" }} to={routerConstants.HOME_ROUTE}>
              {localLanguage.HOME}
            </Link>
          </label>
          <label className="options">
            <Link to={routerConstants.ABOUT_ROUTE} style={{ color: "#334d4d" }}>
              {localLanguage.ABOUT}
            </Link>
          </label>
          <label className="options">
            <Link
              to={routerConstants.PRODUCTS_ROUTE}
              style={{ color: "#334d4d" }}
            >
              {localLanguage.PRODUCTS}
            </Link>
          </label>
          <label className="options">
            <Link
              to={routerConstants.SHOPPING_CART_ROUTE}
              style={{ color: "#334d4d" }}
            >
              <Badge count={storeData?.totalCount}>
                <Avatar
                  style={{ color: "black", backgroundColor: "white" }}
                  icon={<ShoppingCartOutlined />}
                />
              </Badge>
            </Link>
          </label>
          <label className="options">
            <Popover
              style={{
                width: "100%",
              }}
              title={
                <div style={{ textAlign: "center" }}>{localLanguage.HELLO}</div>
              }
              content={
                obj?.token ? (
                  <Button style={{ width: "100%" }} onClick={showModal}>
                    {localLanguage.LOGOUT}
                  </Button>
                ) : (
                  <Button style={{ width: "100%" }} onClick={handlelogin}>
                    {localLanguage.LOGIN}
                  </Button>
                )
              }
            >
              <Avatar
                src={
                  obj ? obj.image : <UserOutlined style={{ color: "black" }} />
                }
              />
            </Popover>
          </label>
        </div>
      ) : (
        <div className="sideMenu" style={{}}>
          <Space style={{ marginRight: 30 }} wrap>
            <Popover
              onOpenChange={toggleCollapsed}
              placement="bottomRight"
              style={{}}
              content={items}
              trigger="click"
              open={collapsed}
            >
              <Button style={{ width: "100%" }}>
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              </Button>
            </Popover>
          </Space>
        </div>
      )}
    </>
  );
};

export default HeaderComponent;
