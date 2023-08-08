import React, { useState, useEffect } from "react";
import "./ShoppingCart.css";
import {
  Card,
  List,
  Button,
  Badge,
  Modal,
  Form,
  Input,
  Select,
  message,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseProductCount,
  increaseProductCount,
  removeAllFromCart,
  removeFromCart,
} from "../store/slices/shoppingCartSlice";
import {
  EnvironmentOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
  VerticalAlignMiddleOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import {
  formConstants,
  localLanguage,
  operationConstants,
  routerConstants,
} from "../../utils/constants";

const ShoppingCart = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [open, setOpen] = useState({ viable: false, item: {} });
  const handleDeleteState = () => {
    dispatch(removeFromCart(open?.item.id));
    setOpen({ viable: false, item: {} });
  };
  const showModal = (item) => {
    setOpen({ item: item, viable: true });
  };
  const hideModal = () => {
    setOpen({ item: {}, viable: false });
  };
  const [messageApi1, contextHolder1] = message.useMessage();
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const cartData = useSelector((state) => {
    return state.shoppingCartReducer;
  });
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const openModel = () => {
    setShow(true);
  };
  const handleOk = () => {
    setShow(false);
  };
  const handleCancel = () => {
    setShow(false);
  };
  const onFinish = (values) => {
    setShow(false);
    setTimeout(() => {
      dispatch(removeAllFromCart());
      navigate(routerConstants.HOME_ROUTE);
    }, 3000);
    messageApi
      .open({
        type: "loading",
        content: formConstants.PLEASE_WAIT,
        duration: 1.5,
      })
      .then(() => message.success(localLanguage.ORDER_PLACED, 1.5))
      .then(() =>
        message.info(
          <div>
            <h2>{`${localLanguage.HEY} ${values.name} ${localLanguage.QUOTE}`}</h2>
            <h4>{localLanguage.THANKS_FOR_SHOPPING}</h4>
            <h4>{localLanguage.HAVE_A_GREAT_DAY}</h4>
            <h3>{localLanguage.REGARDS}</h3>
          </div>,
          4
        )
      );
  };

  const handleDelete = (item) => {
    dispatch(removeFromCart(item.id));
  };
  const handleTotalPrice = () => {
    const Checkout = cartData?.cart
      .map((item) => {
        return item.price * item.productCount;
      })
      .reduce((a, b) => {
        return a + b;
      });

    return Checkout;
  };
  const validatePhoneNumber = (_, value) => {
    const phoneRegex = /^[0-9]{10}$/;
    if (value.match(phoneRegex)) {
      return Promise.resolve();
    }
    return Promise.reject(formConstants.ENTER_VALID_MOBILE_NO);
  };

  const handleDecreaseButton = (item) => {
    let res = item.productCount == 1;
    return res ? true : false;
  };
  const handleIncreaseButton = (item) => {
    let res = item.stockCount == item.productCount;
    return res ? true : false;
  };
  const handleCount = (countType, item) => {
    if (countType == operationConstants.INCREMENT) {
      dispatch(increaseProductCount(item.id));
    } else {
      dispatch(decreaseProductCount(item.id));
    }
  };

  return (
    <>
      {contextHolder1}
      {contextHolder}
      <Modal
        style={{}}
        footer={[
          <div>
            <Button onClick={hideModal}>Cancel</Button>
            <Button onClick={handleDeleteState} type="primary">
              Remove
            </Button>
          </div>,
        ]}
        open={open?.viable}
        onOk={hideModal}
        onCancel={hideModal}
      >
        Do you really want to remove ?
      </Modal>
      <Modal footer={[]} open={show} onOk={handleOk} onCancel={handleCancel}>
        <div>
          <h2 style={{ textAlign: "center" }}>
            {localLanguage.PLEASE_CONFIRM_DETAILS}
          </h2>
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
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder={formConstants.NAME_PLACEHOLDER}
              />
            </Form.Item>
            <Form.Item
              name={formConstants.EMAIL}
              rules={[
                {
                  type: "email",
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
              name={formConstants.PHONE}
              rules={[
                {
                  required: true,
                  validator: validatePhoneNumber,
                  message: formConstants.PHONE_VALIDATION_MESSAGE,
                },
              ]}
            >
              <Input
                count={true}
                prefix={<PhoneOutlined className="site-form-item-icon" />}
                type="phone"
                placeholder={formConstants.PHONE_PLACEHOLDER}
              />
            </Form.Item>
            <Form.Item
              name={formConstants.ADDRESS1}
              rules={[
                {
                  required: true,
                  message: formConstants.ADDRESS_VALIDATION_MESSAGE,
                },
              ]}
            >
              <Input
                prefix={<EnvironmentOutlined className="site-form-item-icon" />}
                placeholder={formConstants.ADDRESS1_PLACEHOLDER}
              />
            </Form.Item>
            <Form.Item
              name={formConstants.ADDRESS2}
              rules={[
                {
                  required: false,
                  message: formConstants.ADDRESS_VALIDATION_MESSAGE,
                },
              ]}
            >
              <Input
                prefix={<EnvironmentOutlined className="site-form-item-icon" />}
                placeholder={formConstants.ADDRESS2_PLACEHOLDER}
              />
            </Form.Item>

            <Form.Item
              name={formConstants.LANDMARK}
              rules={[
                {
                  required: true,
                  message: formConstants.LANDMARK_VALIDATION_MESSAGE,
                },
              ]}
            >
              <Input
                prefix={
                  <VerticalAlignMiddleOutlined className="site-form-item-icon" />
                }
                placeholder={formConstants.LANDMARK_PLACEHOLDER}
              />
            </Form.Item>

            <Form.Item
              rules={[
                {
                  required: true,
                  message: formConstants.PAYMENT_MODE_VALIDATION_MESSAGE,
                },
              ]}
              name={formConstants.PAYMENT_MODE}
            >
              <Select
                placeholder={formConstants.PAYMENT_MODE_PLACEHOLDER}
                required={true}
              >
                <Select.Option value={localLanguage.CASH_ON_DELIVERY}>
                  {localLanguage.CASH_ON_DELIVERY}
                </Select.Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button
                style={{ width: "100%" }}
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                {formConstants.PLACE_ORDER}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
      <div className="shopMain">
        <div className="cartData">
          <h1 style={{ textAlign: "center", margin: 0, marginBottom: 4 }}>
            {localLanguage.SHOPPING}{" "}
            <span style={{ color: "#f7444e" }}>{localLanguage.CART}</span>
          </h1>
          <List
            grid={{
              gutter: 16,
              column: 1,
            }}
            style={{ height: 480, overflow: "auto", overflowX: "hidden" }}
            dataSource={cartData?.cart}
            renderItem={(item, index) => (
              <List.Item>
                <Card
                  key={index}
                  title={item.title}
                  style={{ height: "100%", width: "100%", borderRadius: 0 }}
                  cover={
                    <div
                      style={{
                        height: "180px",
                        width: "100%",
                        display: "flex",
                      }}
                    >
                      <div
                        style={{
                          height: "180px",
                          width: "30%",
                          display: "flex",
                        }}
                      >
                        <img
                          style={{
                            height: "100%",
                            width: "100%",
                            objectFit: "contain",
                          }}
                          src={item.thumbnail}
                          alt={item.alt}
                        />
                      </div>
                      <div
                        style={{
                          height: "180px",
                          width: "100%",

                          margin: 15,
                        }}
                      >
                        <div style={{ marginBottom: 5, fontWeight: "bold" }}>
                          <label>{item.title}</label>
                        </div>
                        <div style={{ marginBottom: 10 }}>
                          <label>{item.description}</label>
                        </div>
                        <div style={{ marginBottom: 5, fontWeight: "bold" }}>
                          <label>{`Rs. ${item.price}.00`}</label>
                        </div>
                        <div style={{ marginBottom: 20, fontWeight: "bold" }}>
                          <label>{`${localLanguage.RATING} : ${item.rating}`}</label>
                        </div>
                        <div>
                          <div
                            className="counter"
                            style={{
                              width: "30%",
                              display: "flex",
                              margin: 0,
                              alignItems: "center",
                            }}
                          >
                            <Button
                              disabled={handleIncreaseButton(item)}
                              type="text"
                              value={item.id}
                              onClick={() =>
                                handleCount(operationConstants.INCREMENT, item)
                              }
                              style={{ fontWeight: "bold" }}
                            >
                              {operationConstants.INCREMENT}
                            </Button>
                            <Badge
                              style={{
                                backgroundColor: "#e0ebeb",
                                color: "black",
                                fontSize: "16px",
                              }}
                              count={item.productCount}
                            ></Badge>
                            <Button
                              disabled={handleDecreaseButton(item)}
                              type="text"
                              onClick={() =>
                                handleCount(operationConstants.DECREMENT, item)
                              }
                              style={{ fontWeight: "bold" }}
                            >
                              {operationConstants.DECREMENT}
                            </Button>
                            <Button
                              type="link"
                              onClick={() => {
                                showModal(item);

                                // handleDelete(item)
                              }}
                            >
                              {localLanguage.DELETE}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  }
                ></Card>
              </List.Item>
            )}
          />
        </div>
        {cartData.cart.length ? (
          <div className="Checkout">
            <h1 style={{ textAlign: "center", margin: 0, marginBottom: 4 }}>
              {localLanguage.CHECK}
              <span style={{ color: "#f7444e" }}>{localLanguage.OUT}</span>
            </h1>
            <Card
              title={`${localLanguage.TOTAL_CART} : (${cartData?.totalCount} ${localLanguage.ITEMS})`}
              style={{ height: "100%", width: "100%", textAlign: "center" }}
              actions={[
                <Button
                  onClick={openModel}
                  type="primary"
                  style={{ width: "90%" }}
                >
                  {localLanguage.PROCEED_TO_CHECKOUT}
                </Button>,
              ]}
            >
              <h3>
                {localLanguage.TOTAL_PAYABLE +
                  handleTotalPrice() +
                  localLanguage.PAISE}
              </h3>
            </Card>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default ShoppingCart;
