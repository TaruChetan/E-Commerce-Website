import React, { useEffect } from "react";
import { Carousel, Card } from "antd";
import "./index.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import slide2 from "../../assets/images/slide2.jpg";
import slide3 from "../../assets/images/slide3.jpg";
import slide4 from "../../assets/images/slide4.jpg";
import slide5 from "../../assets/images/slide5.jpg";
import ProductList from "./ProductList";
import ShopWithUs from "./ShopWithUs";
import {
  getAllProducts,
  getAllProductsMain,
} from "../store/slices/productSlice";
import { fetchProducts } from "../api";
import { useDispatch, useSelector } from "react-redux";
import { localLanguage } from "../../utils/constants";

const SliderWindow = () => {
  const mainData = useSelector((state) => {
    return state.productReducer;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    fetchProducts()
      .then((res) => {
        if (mainData.products.length == 0) {
          dispatch(getAllProducts(res.data.products));
          dispatch(getAllProductsMain(res.data.products));
        }
      })
      .catch((err) => {
        dispatch(getAllProducts([]));
      });
  }, []);

  return (
    <>
      <div className="mainContainer">
        <div className="containerslide">
          <Carousel autoplay style={{ padding: 5 }} className="mainSlide">
            <div>
              <LazyLoadImage
                src={slide4}
                alt="SlideShow"
                className="SlideStyle"
              />
            </div>
            <div>
              <LazyLoadImage
                src={slide3}
                alt="SlideShow"
                className="SlideStyle"
              />
            </div>
            <div>
              <LazyLoadImage
                src={slide2}
                alt="SlideShow"
                className="SlideStyle"
              />
            </div>
            <div>
              <LazyLoadImage
                src={slide5}
                alt="SlideShow"
                className="SlideStyle"
              />
            </div>
          </Carousel>
        </div>

        <Card style={{ padding: 8, margin: 5 }}>
          <div className="containerProducts">
            <h2 className="Products">
              {localLanguage.OUR}
              <span style={{ color: "#f7444e" }}>{localLanguage.PRODUCTS}</span>
            </h2>
          </div>
          <ProductList />
        </Card>
        <Card style={{ padding: 8, margin: 5 }}>
          <div className="containerProducts">
            <h2 className="Products">
              {localLanguage.WHY}
              <span style={{ color: "#f7444e" }}>{localLanguage.SHOP}</span>
              {localLanguage.WITH_US}
            </h2>
          </div>
          <div className="Shopwithus">
            <ShopWithUs />
          </div>
        </Card>
      </div>
    </>
  );
};

export default SliderWindow;
