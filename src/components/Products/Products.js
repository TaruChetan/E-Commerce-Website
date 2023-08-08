import React, { useEffect } from "react";
import { Card, List, Button, Spin } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Searchbar from "./Searchbar";
import Filters from "./Filters";
import {
  getAllProducts,
  getAllProductsMain,
} from "../store/slices/productSlice";
import { fetchProducts } from "../api";
import { addToCart } from "../store/slices/shoppingCartSlice";
import { useNavigate } from "react-router-dom";
import { localLanguage, routerConstants } from "../../utils/constants";
const { Meta } = Card;

const Products = () => {
  const data = useSelector((state) => {
    return state.productReducer;
  });
  const cartData = useSelector((state) => {
    return state.shoppingCartReducer;
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts()
      .then((res) => {
        if (data.products.length == 0) {
          dispatch(getAllProducts(res.data.products));
          dispatch(getAllProductsMain(res.data.products));
        }
      })
      .catch((err) => {
        dispatch(getAllProducts([]));
      });
  }, []);

  const handleAddToCart = (item) => {
    let cnt = Math.floor(Math.random() * 4) + 1;
    dispatch(addToCart({ ...item, productCount: 1, stockCount: cnt }));
  };
  const handleBuyProduct = (item) => {
    let res = cartData?.cart.find((el) => el.id == item.id);
    if (res) {
      navigate(routerConstants.SHOPPING_CART_ROUTE);
    } else {
      let cnt = Math.floor(Math.random() * 4) + 1;

      dispatch(addToCart({ ...item, productCount: 1, stockCount: cnt }));
      navigate(routerConstants.SHOPPING_CART_ROUTE);
    }
  };
  const handleCard = (item) => {
    navigate(`${routerConstants.PRODUCT_DETAILS_ROUTE}/${item.id}`);
  };
  const handleShoppingCartDisabled = (item) => {
    let res = cartData?.cart.find((el) => el.id == item.id);
    return res ? true : false;
  };

  const truncateDescription = (text) => {
    return `${text.substring(0, 40)}...`;
  };
  return (
    <>
      <div style={{ width: "99%", margin: 6, display: "flex" }}>
        <Filters />
        <Searchbar />
      </div>

      {data.isLoader ? (
        <>
          <Spin style={{ height: "100%", width: "100%" }} />
        </>
      ) : (
        <>
          <List
            style={{ padding: 18 }}
            grid={{
              gutter: 16,
              sm: 2,
              xs: 1,
              md: 3,
              lg: 4,
              column: 5,
            }}
            dataSource={data?.products}
            renderItem={(item, index) => (
              <List.Item style={{ margin: 12 }}>
                {
                  <div style={{ width: "100%", height: "100%" }}>
                    <Card
                      onClick={() => handleCard(item)}
                      loading={data?.isLoader}
                      key={index}
                      hoverable
                      style={{
                        objectFit: "conver",
                      }}
                      actions={[
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleBuyProduct(item);
                          }}
                          type="primary"
                        >
                          {localLanguage.BUY_NOW}
                        </Button>,
                        <Button
                          disabled={handleShoppingCartDisabled(item)}
                          type="default"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart(item);
                          }}
                        >
                          <ShoppingCartOutlined />
                        </Button>,
                      ]}
                      title={item.title}
                      cover={
                        <div style={{ height: "180px", width: "100%" }}>
                          <LazyLoadImage
                            style={{
                              height: "100%",
                              width: "100%",
                              objectFit: "contain",
                            }}
                            src={item.thumbnail}
                            alt={item.alt}
                          />
                        </div>
                      }
                    >
                      <Meta
                        title={`Rs  ${item.price}.00`}
                        description={truncateDescription(item.description)}
                      />
                    </Card>
                  </div>
                }
              </List.Item>
            )}
          />
        </>
      )}
    </>
  );
};

export default Products;
