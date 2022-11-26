import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import {
  Row,
  Col,
  Card,
  Button,
  Space,
  Input,
  InputNumber,
  Divider,
  Checkbox,
} from "antd";
import { useRecoilState, useRecoilValue } from "recoil";
import { orderListStatsState } from "../../atoms";
import { useItems } from "../../query/item";
import OrderRow from "./OrderRow";

const formatter = Intl.NumberFormat("ko-kr");

const OrderList = (props) => {
  const { orderList, totalOrderNum, totalOrderStock, totalOrderPrice } =
    useRecoilValue(orderListStatsState);

  const [orders, setOrders] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    setOrders(orderList);
    console.log(totalOrderNum);
    console.log(totalOrderStock);
    console.log(totalOrderPrice);
  }, [orderList]);

  const { isLoading: isLoading, status: status, data: data } = useItems();

  useEffect(() => {
    if (status === "success") {
      setItems(data?.data.items);
    }
  }, [status]);

  return (
    <Row gutter={16} style={{ padding: 10 }}>
      <Col xs={24}>
        <Divider>주문</Divider>
      </Col>
      <Col xs={24}>
        <Row gutter={16} style={{ padding: 10 }}>
          <Col xs={6}>
            <Checkbox /> <Button size="small">선택삭제</Button>
          </Col>
          <Col xs={6}>상품정보</Col>
          <Col xs={6}>수량</Col>
          <Col xs={6}>상품금액(원)</Col>
        </Row>

        {orders.length === 0 && (
          <Row gutter={16} style={{ padding: 10 }}>
            <Col xs={24}>주문할 상품이 없습니다.</Col>
          </Row>
        )}

        {orders.length > 0 &&
          orders.map((order, key) => {
            let item = items?.find((x) => x.idx === order.item);

            return (
              <OrderRow key={key} rowkey={key} item={item} order={order} />
            );
          })}

        <Row gutter={16} style={{ padding: 10 }}>
          <Col xs={24}>
            <Card title="주문자 정보">
              <Card type="inner" title="주문자명/이메일">
                0
              </Card>
              <Card
                style={{
                  marginTop: 16,
                }}
                type="inner"
                title="연락처"
              >
                0
              </Card>
              <Card
                style={{
                  marginTop: 16,
                }}
                type="inner"
                title="배송지정보"
              >
                0
              </Card>
            </Card>
          </Col>
        </Row>

        <Row gutter={16} style={{ padding: 10 }}>
          <Col xs={24}>
            <Card title="결제정보">
              <Card type="inner" title="전체 상품금액(원)">
                0
              </Card>
              <Card
                style={{
                  marginTop: 16,
                }}
                type="inner"
                title="전체 수량(개)"
              >
                0
              </Card>
              <Card
                style={{
                  marginTop: 16,
                }}
                type="inner"
                title="결제 예정 금액(원)"
              >
                0
              </Card>
            </Card>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={6} offset={9}>
            <Button type="primary" block>
              주문결제
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

OrderList.propTypes = {};

export default OrderList;
