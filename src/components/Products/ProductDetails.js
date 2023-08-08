import { Button, Card, Divider } from "antd";
import React, { useEffect, useState } from "react";
import "./ProductDetails.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { localLanguage, routerConstants } from "../../utils/constants";
import { addToCart } from "../store/slices/shoppingCartSlice";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const obj = JSON.parse(localStorage.getItem(localLanguage.ACCESS_KEY));
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const { productId } = useParams();
  const data = useSelector((state) => {
    return state.productReducer;
  });
  const cartData = useSelector((state) => {
    return state.shoppingCartReducer;
  });
  const [productItem, setproductItem] = useState(null);
  const [isItem, setItem] = useState(false);
  useEffect(() => {
    const rec = data?.products.find((item) => {
      if (productId == item.id) setproductItem(item);
    });
    const rec1 = cartData?.cart.find((item1) => {
      if (productId == item1.id) {
        setItem(true);
      }
    });
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const handleClick = () => {
    if (obj?.token) {
      let cnt = Math.floor(Math.random() * 4) + 1;
      if (!isItem)
        dispatch(
          addToCart({ ...productItem, productCount: 1, stockCount: cnt })
        );
      navigate(routerConstants.SHOPPING_CART_ROUTE);
    }
  };

  return (
    <>
      <div style={{ width: "100%" }}>
        <Card
          actions={[
            <Button
              onClick={handleClick}
              style={{ width: "20%", height: "auto" }}
              type="primary"
            >
              {localLanguage.BUY_NOW}
            </Button>,
          ]}
          style={{ width: "100%" }}
          title={
            <div style={{ fontSize: "40px", fontFamily: "arial" }}>
              {screenWidth > 500
                ? `${productItem?.category} / ${productItem?.title}`
                : `${productItem?.title}`}
            </div>
          }
        >
          <div
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
          >
            {screenWidth > 500 ? (
              productItem?.images.map((src) => {
                return (
                  <div
                    style={{
                      margin: 5,
                      width: "100%",
                      height: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "fill",
                      }}
                      src={src}
                    />
                  </div>
                );
              })
            ) : (
              <img
                style={{ width: "100%", height: "100%", objectFit: "fill" }}
                src={productItem?.thumbnail}
              />
            )}
          </div>
          <div style={{ fontSize: 20, width: "100%" }}>
            <Divider />
            <Divider />
            <div style={{ fontWeight: "bolder" }}>{productItem?.brand}</div>
            <Divider />
            <div>{`${productItem?.description}`}</div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default ProductDetails;
