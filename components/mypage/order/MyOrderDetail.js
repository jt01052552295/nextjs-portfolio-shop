import React, { useEffect, useState } from "react";
import axios from "axios";
import { v1 } from "uuid";
import Head from "next/head";
import Script from "next/script";
import PropTypes from "prop-types";
import {
  Row,
  Col,
  Card,
  Button,
  Space,
  Input,
  Avatar,
  Divider,
  Checkbox,
  Form,
  Alert,
} from "antd";
const { Meta } = Card;
import { useRouter } from "next/router";
import { useItems } from "../../../query/item";
import MyOrderDetailProduct from "./MyOrderDetailProduct";

const formatter = Intl.NumberFormat("ko-kr");

const MyOrderDetail = ({ order }) => {
  const router = useRouter();
  const [orderInfo, setOrderInfo] = useState(null);
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);

  const [items, setItems] = useState([]);
  const { isLoading: isLoading, status: status, data: data } = useItems();

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setOrderInfo(order);
  }, []);

  useEffect(() => {
    if (status === "success" && orderInfo !== null) {
      setPrice(orderInfo.order_data.reduce((a, c) => a + c.price, 0));
      setStock(orderInfo.order_data.reduce((a, c) => a + c.stock, 0));
      setItems(data.data.items);
      let new_arr = [];
      orderInfo?.order_data.map((row) => {
        let item = items.find((x) => x.idx === row.item);
        let new_row = { ...row, itemInfo: item };
        new_arr.push(new_row);
      });
      setOrders(new_arr);
    }
  }, [orderInfo]);

  return (
    <Row gutter={16} style={{ padding: 10 }}>
      <Col xs={24}>
        <Divider>주문</Divider>
      </Col>
      <Col xs={24}>
        <Row gutter={16} style={{ padding: 10 }}>
          <Col xs={24}>
            <Card title="주문 내역">
              {orders.length === 0 && (
                <Row gutter={16} style={{ padding: 10 }}>
                  <Col xs={24}>주문 상품이 없습니다.</Col>
                </Row>
              )}
              {orders.length > 0 &&
                orders.map((order, key) => {
                  return <MyOrderDetailProduct key={key} order={order} />;
                })}
            </Card>
          </Col>
        </Row>

        <Row gutter={16} style={{ padding: 10 }}>
          <Col xs={24}>
            <Card title="주문자 정보">
              <Card type="inner" title="주문자명">
                {orderInfo?.buyer_name}
              </Card>
              <Card
                style={{
                  marginTop: 16,
                }}
                type="inner"
                title="이메일"
              >
                {orderInfo?.buyer_email}
              </Card>
              <Card
                style={{
                  marginTop: 16,
                }}
                type="inner"
                title="연락처"
              >
                {orderInfo?.buyer_tel}
              </Card>
              <Card
                style={{
                  marginTop: 16,
                }}
                type="inner"
                title="배송지정보"
              >
                {orderInfo?.buyer_addr}
              </Card>
            </Card>
          </Col>
        </Row>

        <Row gutter={16} style={{ padding: 10 }}>
          <Col xs={24}>
            <Card title="결제정보">
              <Card type="inner" title="전체 상품금액(원)">
                {formatter.format(price)}
              </Card>
              <Card
                style={{
                  marginTop: 16,
                }}
                type="inner"
                title="전체 수량(개)"
              >
                {stock}
              </Card>
              <Card
                style={{
                  marginTop: 16,
                }}
                type="inner"
                title="배달비(원)"
              >
                {formatter.format(3000)}
              </Card>
              <Card
                style={{
                  marginTop: 16,
                }}
                type="inner"
                title="결제 금액(원)"
              >
                {formatter.format(orderInfo?.paid_amount)}
              </Card>
            </Card>
          </Col>
        </Row>
        <Row gutter={[16, 8]}>
          <Col xs={12} offset={6}>
            <Alert
              message="주문취소"
              description="주문취소를 누르면 결제, 주문내역이 취소됩니다."
              type="error"
            />
          </Col>
          <Col xs={6} offset={6}>
            <Button type="danger" block onClick={(e) => alert("준비중..")}>
              주문취소
            </Button>
          </Col>
          <Col xs={6}>
            <Button type="primary" block onClick={(e) => router.back()}>
              뒤로
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

MyOrderDetail.propTypes = {};

export default MyOrderDetail;
