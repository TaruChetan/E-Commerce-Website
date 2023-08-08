import React from "react";
import { Card, List } from "antd";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import delivery from "../../assets/images/delivery.jpg";
import sale from "../../assets/images/sale.jpg";
import quality from "../../assets/images/quality.jpg";
import { localLanguage } from "../../utils/constants";
const { Meta } = Card;

const data = [
  {
    title: localLanguage.FAST_DELIVERY,
    description: localLanguage.SITE_NAME,
    src: delivery,
    alt: localLanguage.ALTERNATE_IMAGE_NAME,
  },
  {
    title: localLanguage.EXCLUSIVE_OFFERS,
    description: localLanguage.SITE_NAME,
    src: sale,
    alt: localLanguage.ALTERNATE_IMAGE_NAME,
  },
  {
    title: localLanguage.QUALITY_PRODUCTS,
    description: localLanguage.SITE_NAME,
    src: quality,
    alt: localLanguage.ALTERNATE_IMAGE_NAME,
  },
];

const ShopWithUs = () => {
  return (
    <List
      style={{}}
      grid={{
        gutter: 10,
        sm: 2,
        md: 2,
        xs: 1,
        column: 3,
      }}
      dataSource={data}
      renderItem={(item, index) => (
        <List.Item>
          <Card
            key={index}
            hoverable
            style={{
              margin: "auto",
              width: "300px",
            }}
            cover={<LazyLoadImage src={item.src} alt={item.alt} />}
          >
            <Meta title={item.title} description={item.description} />
          </Card>
        </List.Item>
      )}
    />
  );
};

export default ShopWithUs;
