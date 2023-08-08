import { Card, List, Button } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { localLanguage, routerConstants } from "../../utils/constants";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const ProductList = () => {
  const dataMain = useSelector((state) => {
    return state.productReducer;
  });

  const obj = JSON.parse(localStorage.getItem(localLanguage.ACCESS_KEY));
  const navigate = useNavigate();
  const getData = () => {
    let filterData = [];
    const indexes = [];
    while (indexes.length < 5) {
      const index = Math.floor(Math.random() * 30);
      if (!indexes.includes(index)) {
        indexes.push(index);
      }
    }

    filterData = dataMain?.productsMain.filter((item) => {
      return indexes.includes(item.id);
    });

    return filterData;
  };
  const handleLogin = () => {
    obj?.token
      ? navigate(routerConstants.PRODUCTS_ROUTE)
      : navigate(routerConstants.LOGIN_ROUTE);
  };

  return (
    <>
      <List
        style={{ padding: 8 }}
        grid={{
          gutter: 16,
          sm: 2,
          xs: 1,
          md: 3,
          lg: 4,
          column: 5,
        }}
        dataSource={getData()}
        renderItem={(item, index) => (
          <List.Item>
            {index === 4 ? (
              <div style={{ width: "100%", height: "100%" }}>
                <Card
                  hoverable
                  bordered={false}
                  style={{}}
                  actions={[
                    <Button type="primary">{localLanguage.BUY_NOW}</Button>,
                    <Button onClick={() => handleLogin()} type="default">
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
                  <div
                    style={{
                      position: "absolute",
                      alignItems: "center",
                      alignContent: "center",
                      backgroundColor: "rgba(0, 0, 0, 0.2)",
                      width: "100%",
                      height: "100%",
                      bottom: 0,
                      right: 0,
                      borderRadius: 8,
                      zIndex: 900,
                      display: "flex",
                      justifyItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Link to={"/Products"} style={{ width: "70%" }}>
                      <Button
                        style={{
                          textAlign: "center",

                          height: "100%",
                          width: "100%",
                        }}
                        type="primary"
                      >
                        {localLanguage.SHOW_MORE}
                      </Button>
                    </Link>
                  </div>
                </Card>
              </div>
            ) : (
              <Card
                onClick={() => handleLogin()}
                hoverable
                style={{}}
                actions={[
                  <Button type="primary">{localLanguage.BUY_NOW}</Button>,
                  <Button type="default" onClick={() => handleLogin()}>
                    <ShoppingCartOutlined />
                  </Button>,
                ]}
                title={item.title}
                cover={
                  <div style={{ height: "180px", width: "100%" }}>
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
                }
              ></Card>
            )}
          </List.Item>
        )}
      />
    </>
  );
};

export default ProductList;
