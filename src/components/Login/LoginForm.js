import React from "react";
import "./LoginForm.css";
import { Card } from "antd";
import sale from "./sale.jpg";
import Meta from "antd/es/card/Meta";
import { localLanguage } from "../../utils/constants";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
const LoginForm = ({ Child }) => {
  return (
    <div className="main">
      <div className="formClass">{Child}</div>
      <div className="cardClass">
        <Card
          style={{ width: "100%", height: "100%" }}
          cover={
            <LazyLoadImage
              src={sale}
              alt={localLanguage.ALTERNATE_IMAGE_NAME}
            />
          }
        >
          <Meta
            style={{ textAlign: "center", fontWeight: "bold" }}
            title={localLanguage.SITE_NAME}
          />
        </Card>
      </div>
    </div>
  );
};
export default LoginForm;
