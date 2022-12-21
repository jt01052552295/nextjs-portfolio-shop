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
import { useRouter } from "next/router";

const formatter = Intl.NumberFormat("ko-kr");

const Item = ({ item }) => {
  const router = useRouter();
  return (
    <Col span={12}>
      <Card
        title={item.name}
        hoverable
        cover={<img alt="example" src={`${item.image}`} />}
        style={{ marginBottom: 10 }}
        // actions={[
        //   <SettingOutlined key="setting" />,
        //   <EditOutlined key="edit" />,
        //   <EllipsisOutlined key="ellipsis" />,
        // ]}
        onClick={(e) =>
          router.push(`/item/${item.idx}`)
          // location.href = `/item/${item.idx}`
        }
      >
        <div className="category">
          <span>{item.category}</span>
        </div>

        <div className="item_price">
          <span className="price">{formatter.format(item.price)}</span>
          <span className="unit">원</span>
        </div>
      </Card>
    </Col>
  );
};

Item.propTypes = { item: PropTypes.object.isRequired };

export default Item;
