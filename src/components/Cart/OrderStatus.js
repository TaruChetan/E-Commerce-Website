import { Button, Result } from "antd";
import React from "react";
import { localLanguage, routerConstants } from "../../utils/constants";
import { useNavigate } from "react-router-dom";

const OrderStatus = (props) => {
  const navigate = useNavigate();
  return (
    <div>
      <Result
        status="success"
        title={`Successfully Purchased Cloud Server ECS!`}
        subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
        extra={[
          <Button
            onClick={() => navigate(routerConstants.HOME_ROUTE)}
            type="primary"
            key="console"
          >
            {localLanguage.HOME}
          </Button>,
        ]}
      />
    </div>
  );
};

export default OrderStatus;
