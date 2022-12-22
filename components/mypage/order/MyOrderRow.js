import React, { useEffect, useState } from "react";
import { v1 } from "uuid";
import axios from "axios";
import Link from "next/link";
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
import { useRecoilState, useRecoilValue } from "recoil";
import { useItems } from "../../../query/item";

const formatter = Intl.NumberFormat("ko-kr");

const MyOrderRow = ({ rowkey, order }) => {
  const [orderInfo, setOrder] = useState(null);
  const [items, setItems] = useState([]);
  const { isLoading: isLoading, status: status, data: data } = useItems();

  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [image, setImage] = useState(0);

  useEffect(() => {
    if (status === "success") {
      setItems(data?.data.items);
      setOrder(order);
    }
    // console.log(orderInfo);
    // console.log(items);
    if (orderInfo) {
      setPrice(orderInfo.order_data.reduce((a, c) => a + c.price, 0));
      setStock(orderInfo.order_data.reduce((a, c) => a + c.stock, 0));

      orderInfo.order_data.map((row) => {
        let item = items.find((x) => x.idx === row.item);
        setImage(item.image);
      });
    }
  }, [status, orderInfo]);

  if (!orderInfo) {
    return (
      <Row key={`key-${v1()}`} gutter={16} style={{ padding: 10 }}>
        <Col>
          <Skeleton.Input active block={true} />
        </Col>
      </Row>
    );
  }

  if (orderInfo) {
    return (
      <Card
        type="inner"
        extra={
          <Link href={`/mypage/order/${orderInfo.imp_uid}`}>상세보기</Link>
        }
        title={orderInfo.name}
        style={{
          marginBottom: 16,
        }}
      >
        <Meta
          avatar={image ? <Avatar src={image} /> : <DeleteOutlined />}
          title={`${formatter.format(price)}원`}
          description={`${formatter.format(stock)}개`}
        />
      </Card>
    );
  }
};

MyOrderRow.propTypes = { order: PropTypes.object.isRequired };

export default MyOrderRow;
