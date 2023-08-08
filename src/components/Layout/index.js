import React from "react";
import { Card, Layout } from "antd";
import { Route, Routes, useNavigate } from "react-router-dom";
import HeaderComponent from "../Header/HeaderComponent";
import SliderWindow from "../Content/SliderWindow";
import FooterComponent from "../Content/FooterComponent";
import LoginForm from "../Login/LoginForm";
import About from "../About/About";
import Products from "../Products/Products";
import Login from "../Login/Login";
import Signup from "../SignUp/Signup";
import ShoppingCart from "../Cart/ShoppingCart";
import { localLanguage, routerConstants } from "../../utils/constants";
import ProductDetails from "../Products/ProductDetails";
import ProtectedRoutes from "../Routing/ProtectedRoutes";
import OrderStatus from "../Cart/OrderStatus";
import { useSelector } from "react-redux";

const { Header, Footer, Content } = Layout;
const LayoutComponent = () => {
  const cartData = useSelector((state) => state.shoppingCartReducer);
  const obj = JSON.parse(localStorage.getItem(localLanguage.ACCESS_KEY));

  const navigate = useNavigate();
  return (
    <Layout
      style={{
        backgroundColor: "#f8f8f8",
      }}
    >
      <Header
        style={{
          position: "fixed",
          backgroundColor: "#fff",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          paddingInline: 0,
          borderBottom: "1px solid #f8f8f8",
          zIndex: 1000,
        }}
      >
        <HeaderComponent />
      </Header>
      <Content style={{ marginTop: 70 }}>
        <Routes>
          <Route
            path={routerConstants.HOME_ROUTE}
            element={<SliderWindow />}
          ></Route>
          <Route
            path={`${routerConstants.PRODUCT_DETAILS_ROUTE}/:${localLanguage.PRODUCT_ID}`}
            element={<ProductDetails />}
          ></Route>
          <Route
            path={routerConstants.LOGIN_ROUTE}
            element={<LoginForm Child={<Login />} />}
          ></Route>
          <Route
            path={routerConstants.SIGNUP_ROUTE}
            element={<LoginForm Child={<Signup />} />}
          ></Route>
          <Route path={routerConstants.ABOUT_ROUTE} element={<About />}></Route>
          <Route
            path={routerConstants.PRODUCTS_ROUTE}
            element={
              <ProtectedRoutes auth={obj?.token ? true : false}>
                <Products />
              </ProtectedRoutes>
            }
          ></Route>
          <Route
            path={routerConstants.SHOPPING_CART_ROUTE}
            element={
              <ProtectedRoutes auth={obj?.token ? true : false}>
                <ShoppingCart />
              </ProtectedRoutes>
            }
          ></Route>
        </Routes>
        <Footer style={{ padding: 0 }}>
          <Card
            style={{ padding: 0, borderRadius: 0, backgroundColor: "#e0ebeb" }}
          >
            <FooterComponent />
          </Card>
        </Footer>
      </Content>
    </Layout>
  );
};

export default LayoutComponent;
