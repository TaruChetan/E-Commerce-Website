import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { userLogin } from "../api";

import {
  formConstants,
  localLanguage,
  operationConstants,
  routerConstants,
} from "../../utils/constants";

const Login = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [messageApi1, contextHolder1] = message.useMessage();

  const [isError, setError] = useState(false);
  const navigatePage = useNavigate();
  const onFinish = (values) => {
    console.log(process.env.REACT_APP_LOGIN_API,"url");
    userLogin(JSON.stringify(values))
      .then((result) => {
        localStorage.setItem(localLanguage.ACCESS_KEY, JSON.stringify(result));
        setTimeout(() => {
          navigatePage(routerConstants.HOME_ROUTE);
        }, 1000);

        showStatus();
        const obj = JSON.parse(localStorage.getItem(localLanguage.ACCESS_KEY));
      })
      .catch((err) => {
        setError(true);
      });
  };

  const showStatus = () => {
    messageApi1.open(
      {
        type: "success",
        content: "You are now logged in",
      },
      1.5
    );
  };
  return (
    <>
      {contextHolder1}
      {contextHolder}
      <Card style={{ width: "100%", height: "100%", alignItems: "center" }}>
        <div className="containerProducts">
          <h2 className="Products">
            {localLanguage.LOG}
            <span style={{ color: "#f7444e" }}>
              {operationConstants.DECREMENT + localLanguage.IN}
            </span>
          </h2>
        </div>

        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name={formConstants.USERNAME}
            rules={[
              {
                required: true,
                message: formConstants.USERNAME_VALIDATION_MESSAGE,
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder={formConstants.USERNAME}
            />
          </Form.Item>
          <Form.Item
            name={formConstants.PASSWORD}
            rules={[
              {
                required: true,
                message: formConstants.PASSWORD_VALIDATION_MESSAGE,
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder={formConstants.PASSWORD}
            />
          </Form.Item>
          {isError ? (
            <span style={{ color: "red" }}>
              {localLanguage.INVALID_CREDENTIALS}
            </span>
          ) : (
            ""
          )}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              style={{ width: "100%" }}
            >
              {localLanguage.LOGIN}
            </Button>
          </Form.Item>
          <Button
            type="default"
            htmlType="submit"
            className="login-form-button"
            style={{ width: "100%" }}
          >
            <Link to={"/Sign-Up"}>{localLanguage.REGISTER}</Link>
          </Button>
        </Form>
      </Card>
    </>
  );
};

export default Login;
