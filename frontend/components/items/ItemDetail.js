import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Row, Col, Card, Button, Space, Input, InputNumber } from "antd";
const { Meta } = Card;
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";

const ItemDetail = ({ item }) => {
  useEffect(() => {
    console.log("ItemDetail", item);
  }, [item]);

  return (
    <Row gutter={16} style={{ padding: 10 }}>
      <Col xs={24}>
        <Card cover={<img alt="pizza" src={item.image} />}>
          <Meta title={item.name} description={item.category} />
          <Card
            type="inner"
            style={{
              marginTop: 16,
            }}
            title="가격(원)"
          >
            {item.price}
          </Card>
          <Card
            type="inner"
            style={{
              marginTop: 16,
            }}
            title="수량"
          >
            <Input.Group compact>
              <Button icon={<PlusOutlined />} />
              <Input
                style={{ width: "50px", textAlign: "center" }}
                defaultValue="1"
              />
              <Button icon={<MinusOutlined />} />
            </Input.Group>
          </Card>
          <Card
            type="inner"
            style={{
              marginTop: 16,
            }}
            title="총 금액"
          >
            1000
          </Card>

          <Card
            style={{
              marginTop: 16,
            }}
          >
            <Row gutter={16} justify="center">
              <Space size="large">
                <Button>장바구니</Button>
                <Button type="primary">바로 구매</Button>
              </Space>
            </Row>
          </Card>
        </Card>
      </Col>
    </Row>
  );
};

ItemDetail.propTypes = { item: PropTypes.object.isRequired };

export default ItemDetail;
