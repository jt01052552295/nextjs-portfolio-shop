import React, { useEffect, useState } from "react";
import { v1 } from "uuid";
import axios from "axios";
import PropTypes from "prop-types";
import {
  Row,
  Col,
  Card,
  Button,
  Space,
  Input,
  Avatar,
  Skeleton,
  Checkbox,
} from "antd";
const { Meta } = Card;
import { PlusOutlined, MinusOutlined, DeleteOutlined } from "@ant-design/icons";

const formatter = Intl.NumberFormat("ko-kr");

const MyOrderDetailProduct = ({ order }) => {
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [item, setItem] = useState(null);

  useEffect(() => {
    setItem(order?.itemInfo);
    setPrice(order?.price);
    setStock(order?.stock);
  }, []);

  if (!order) {
    return (
      <Row gutter={16} style={{ padding: 10 }}>
        <Col xs={24}>
          <Skeleton.Input active block={true} />
        </Col>
      </Row>
    );
  }

  if (order) {
    return (
      <Card
        type="inner"
        title={item?.name}
        style={{
          marginBottom: 16,
        }}
      >
        <Meta
          avatar={<Avatar src={item.image} />}
          title={`${formatter.format(price)}원,  ${stock}개`}
          description={`${formatter.format(item.price)}원`}
        />
      </Card>
    );
  }
};

MyOrderDetailProduct.propTypes = { order: PropTypes.object.isRequired };

export default MyOrderDetailProduct;
