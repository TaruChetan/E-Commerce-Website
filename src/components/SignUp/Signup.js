import React from "react";
import {
  LockOutlined,
  UserOutlined,
  MailOutlined,
  ContactsOutlined,
} from "@ant-design/icons";
import { Button, Card, Form, Input } from "antd";
import { formConstants, localLanguage } from "../../utils/constants";

const Signup = () => {
  const onFinish = (values) => {};
  return (
    <>
      <Card style={{ width: "100%", height: "100%", alignItems: "center" }}>
        <div className="containerProducts">
          <h2 className="Products">
            {localLanguage.SIGN}
            <span style={{ color: "#f7444e" }}>{localLanguage.UP}</span>
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
            name={formConstants.NAME}
            rules={[
              {
                required: true,
                message: formConstants.NAME_VALIDATION_MESSAGE,
              },
            ]}
          >
            <Input
              prefix={<ContactsOutlined className="site-form-item-icon" />}
              placeholder={formConstants.NAME_PLACEHOLDER}
            />
          </Form.Item>
          <Form.Item
            name={formConstants.EMAIL}
            rules={[
              {
                required: true,
                message: formConstants.EMAIL_VALIDATION_MESSAGE,
              },
            ]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder={formConstants.EMAIL_PLACEHOLDER}
            />
          </Form.Item>
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

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              style={{ width: "100%" }}
            >
              {localLanguage.REGISTER}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};

export default Signup;
