import React from "react";
import { localLanguage } from "../../utils/constants";

const About = () => {
  return (
    <>
      <div style={{ width: "100%", height: "100%" }}>
        <div className="containerProducts">
          <h2 className="Products">
            {localLanguage.ABOUT}
            <span style={{ color: "#f7444e" }}>{localLanguage.US}</span>
          </h2>
        </div>
        <div className="containerProducts">
          <h2 className="Products">
            {localLanguage.THE}
            <span style={{ color: "#f7444e" }}>{localLanguage.SHOP}</span>
            {localLanguage.COM}
          </h2>
        </div>

        <h3
          style={{
            wordSpacing: 10,
            lineHeight: 2,
            textTransform: "capitalize",
          }}
        >
          {localLanguage.ABOUT_US_TEXT}
        </h3>
      </div>
    </>
  );
};

export default About;
