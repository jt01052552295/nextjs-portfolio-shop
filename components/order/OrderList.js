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
  Avatar,
  Divider,
  Checkbox,
} from "antd";
const { Meta } = Card;
import { PlusOutlined, MinusOutlined, DeleteOutlined } from "@ant-design/icons";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState, addressSelector, orderListStatsState } from "../../atoms";
import { useItems } from "../../query/item";
import OrderRow from "./OrderRow";

const formatter = Intl.NumberFormat("ko-kr");

const OrderList = (props) => {
  //   const { orderList, totalOrderNum, totalOrderStock, totalOrderPrice } =
  //     useRecoilValue(orderListStatsState);

  //   const [totalOrderNumState, setTotalOrderNumState] = useState(0);
  //   const [totalOrderStockState, setTotalOrderStockState] = useState(0);
  //   const [totalOrderDeliveryState, setTotalOrderDeliveryState] = useState(0);
  //   const [totalOrderPriceState, setTotalOrderPriceState] = useState(0);
  //   const [totalOrderPriceSumState, setTotalOrderPriceSumState] = useState(0);

  //   const address = useRecoilValue(addressSelector);
  //   const [deliveryText, setDeliveryText] = useState("");

  //   const [user, setUserState] = useRecoilState(userState);

  //   const [orders, setOrders] = useState([]);
  //   const [items, setItems] = useState([]);

  //   useEffect(() => {
  //     setOrders(orderList);
  //     // setTotalOrderNumState(totalOrderNum);
  //     // setTotalOrderStockState(totalOrderStock);
  //     // setTotalOrderPriceState(totalOrderPrice);
  //     // setTotalOrderPriceSumState(totalOrderPrice + totalOrderDeliveryState);
  //   }, [orderList]);

  //   useEffect(() => {
  //     if (address?.delivery) {
  //       setDeliveryText(address?.delivery);
  //     }
  //   }, [address]);

  //   useEffect(() => {
  //     if (user) {
  //       console.log(user.email, user.username);
  //     }
  //   }, [user]);

  //   const { isLoading: isLoading, status: status, data: data } = useItems();

  //   useEffect(() => {
  //     if (status === "success") {
  //       setItems(data?.data.items);
  //     }
  //   }, [status]);

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
        </Row>

        <Row gutter={16} style={{ padding: 10 }}>
          <Col xs={24}>
            <Card title="주문 내역">
              {/* {orders.length === 0 && (
                <Row gutter={16} style={{ padding: 10 }}>
                  <Col xs={24}>주문할 상품이 없습니다.</Col>
                </Row>
              )} */}

              {/* {orders.length > 0 &&
                orders.map((order, key) => {
                  let item = items?.find((x) => x.idx === order.item);

                    return (
                      <OrderRow
                        key={key}
                        rowkey={key}
                        item={item}
                        order={order}
                      />
                    );
                })} */}
            </Card>
          </Col>
        </Row>

        <Row gutter={16} style={{ padding: 10 }}>
          <Col xs={24}>
            <Card title="주문자 정보">
              <Card type="inner" title="주문자명(계정)">
                <Input defaultValue="홍길동" suffix="(계정)" />
              </Card>
              <Card
                style={{
                  marginTop: 16,
                }}
                type="inner"
                title="연락처"
              >
                <Input.Group compact>
                  <Input
                    style={{
                      width: "calc(100% - 200px)",
                    }}
                    placeholder="연락처입력"
                  />
                </Input.Group>
              </Card>
              <Card
                style={{
                  marginTop: 16,
                }}
                type="inner"
                title="배송지정보"
              >
                asdf
              </Card>
            </Card>
          </Col>
        </Row>

        {/* <Row gutter={16} style={{ padding: 10 }}>
          <Col xs={24}>
            <Card title="결제정보">
              <Card type="inner" title="전체 상품금액(원)">
                {formatter.format(totalOrderPriceState)}
              </Card>
              <Card
                style={{
                  marginTop: 16,
                }}
                type="inner"
                title="전체 수량(개)"
              >
                {totalOrderStockState}
              </Card>
              <Card
                style={{
                  marginTop: 16,
                }}
                type="inner"
                title="배달비(원)"
              >
                {formatter.format(totalOrderDeliveryState)}
              </Card>
              <Card
                style={{
                  marginTop: 16,
                }}
                type="inner"
                title="결제 금액(원)"
              >
                {formatter.format(totalOrderPriceSumState)}
              </Card>
            </Card>
          </Col>
        </Row> */}
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
