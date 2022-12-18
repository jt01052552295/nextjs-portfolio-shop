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
import MyOrderRow from "./MyOrderRow";
import { useRouter } from "next/router";

const formatter = Intl.NumberFormat("ko-kr");

const MyOrderList = ({ page, list }) => {
  const router = useRouter();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setOrders(list?.body);
  }, [list]);

  return (
    <Row gutter={16} style={{ padding: 10 }}>
      <Col xs={24}>
        <Divider>주문내역</Divider>
      </Col>
      <Col xs={24}>
        <Row gutter={16} style={{ padding: 10 }}>
          <Col xs={24}>
            <Card>
              {orders.length === 0 && (
                <Row gutter={16} style={{ padding: 10 }}>
                  <Col xs={24}>주문이 없습니다.</Col>
                </Row>
              )}

              {orders.length > 0 &&
                orders.map((order, key) => {
                  // let item = items?.find((x) => x.idx === order.item);
                  return <MyOrderRow key={key} rowkey={key} order={order} />;
                })}
            </Card>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={6} offset={9}>
            <Button type="primary" block onClick={(e) => router.back()}>
              뒤로
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

MyOrderList.propTypes = {};

export default MyOrderList;
