import React from "react";
import { Card, List, Button, Space, Descriptions, Spin } from "antd";
const HoverCards = () => {
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <>
    <List
    grid={{
      gutter: 16,
      column: 3,
    }}
    dataSource={data}
    renderItem={(item) => (
      <List.Item>
        <Card loading={true} title={item.title}>Card content</Card>
      </List.Item>
    )}
  />
    </>
  );
};

export default HoverCards;
