import React from "react";
import { localLanguage } from "../../utils/constants";

const FooterComponent = () => {
  return (
    <div style={{ textAlign: "center", padding: 0 }}>
      <div style={{ fontWeight: "bolder", fontSize: "30px" }}>
        {localLanguage.FOOTER_TEXT_THE_SHOP}
      </div>
      <br></br>
      <div style={{ fontSize: "20px" }}>
        {localLanguage.FOOTER_TEXT_COPYRIGHT}
      </div>
    </div>
  );
};

export default FooterComponent;
