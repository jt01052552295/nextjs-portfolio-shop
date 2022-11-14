import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import Image from "next/image";
import { Card, Col, Row, Skeleton } from "antd";
const { Meta } = Card;
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const Item = ({ item }) => {
  return (
    <Col span={12}>
      <Card
        title={item.name}
        hoverable
        cover={<img alt="example" src={`${item.image}`} />}
        style={{ marginBottom: 10 }}
        onClick={(e) => (location.href = `/item/${item.idx}`)}
      >
        <div className="category">
          <span>{item.category}</span>
        </div>

        <div className="item_price">
          <span className="price">{item.price}</span>
          <span className="unit">원</span>
        </div>
      </Card>
    </Col>
  );
};

Item.propTypes = { item: PropTypes.object.isRequired };

export default Item;
