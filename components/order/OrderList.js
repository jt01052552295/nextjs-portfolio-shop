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
} from "antd";
const { Meta } = Card;
import { PlusOutlined, MinusOutlined, DeleteOutlined } from "@ant-design/icons";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  userState,
  addressSelector,
  orderListState,
  orderListStatsState,
  orderListCheckedState,
} from "../../atoms";
import { useItems } from "../../query/item";
import OrderRow from "./OrderRow";
import { phoneNumber } from "../../utils";

const formatter = Intl.NumberFormat("ko-kr");

const OrderList = (props) => {
  const [form] = Form.useForm();
  const { orderList, totalOrderNum, totalOrderStock, totalOrderPrice } =
    useRecoilValue(orderListStatsState);

  const [totalOrderNumState, setTotalOrderNumState] = useState(0);
  const [totalOrderStockState, setTotalOrderStockState] = useState(0);
  const [totalOrderDeliveryState, setTotalOrderDeliveryState] = useState(3000);
  const [totalOrderPriceState, setTotalOrderPriceState] = useState(0);
  const [totalOrderPriceSumState, setTotalOrderPriceSumState] = useState(0);

  const [orderData, setOrderData] = useRecoilState(orderListState);
  const [orderChecked, setOrderChecked] = useRecoilState(orderListCheckedState);

  const address = useRecoilValue(addressSelector);
  const [deliveryText, setDeliveryText] = useState("");

  const [user, setUserState] = useRecoilState(userState);
  const [orderEmail, setEmail] = useState("");
  const [orderName, setName] = useState("");
  const [orderPhone, setPhone] = useState("");

  const [orders, setOrders] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    setOrders(orderList);
    setTotalOrderNumState(totalOrderNum);
    setTotalOrderStockState(totalOrderStock);
    setTotalOrderPriceState(totalOrderPrice);
    setTotalOrderPriceSumState(totalOrderPrice + totalOrderDeliveryState);
  }, [orderList]);

  useEffect(() => {
    if (address?.delivery) {
      setDeliveryText(address?.delivery);
    }
  }, [address]);

  useEffect(() => {
    if (user) {
      console.log(user);
      setEmail(user.email);
      setName(user.username);
    }
  }, [user]);

  const { isLoading: isLoading, status: status, data: data } = useItems();

  useEffect(() => {
    if (status === "success") {
      setItems(data?.data.items);
    }
  }, [status]);

  const checkAll = (e) => {
    let arr = [...orderData];
    const newArr = arr.map((x) => {
      return e.target.checked;
    });
    setOrderChecked(newArr);
  };

  const checkDelete = (e) => {
    let arr = [...orderChecked];
    let newList = [...orderList];

    let checkArr = arr.filter((x) => x === true);
    if (checkArr.length <= 0) {
      alert("삭제할 상품을 선택하세요.");
      return false;
    }

    let delArr = arr
      .reduce((a, c, key) => (c === true ? a.concat(key) : a), [])
      .map((x) => {
        return newList[x];
      });

    let diffrence = newList.filter((x) => !delArr.includes(x));
    setOrderData(diffrence);
    setOrderChecked([]);
  };

  const payment = (e) => {
    window.scrollTo(0, 0);
    let arr = [...orderData];
    if (arr.length <= 0) {
      alert("주문결제 가능한 상품이 없습니다.");
      return false;
    }

    if (!confirm("주문결제 하시겠습니까?")) return false;
    console.log("payment");
    console.log(arr);
    console.log(orderEmail, orderName, orderPhone);
    console.log(deliveryText);
    const IMP = window.IMP; // 생략 가능
    IMP.init(process.env.NEXT_PUBLIC_PG_IMPORT_CODE); // Example: imp00000000a

    IMP.request_pay(
      {
        // param
        pg: "html5_inicis.INIpayTest",
        pay_method: "card",
        merchant_uid: `ord_${v1()}`,
        name: "노르웨이 회전 의자",
        amount: 100,
        buyer_email: orderEmail,
        buyer_name: orderName,
        buyer_tel: orderPhone,
        buyer_addr: deliveryText,
        buyer_postcode: "",
      },
      (rsp) => {
        // callback
        if (rsp.success) {
          // 결제 성공 시 로직,
          console.log(rsp);
        } else {
          // 결제 실패 시 로직,
          console.log(rsp);
          alert(rsp.error_msg);
        }
      }
    );
  };

  return (
    <Row gutter={16} style={{ padding: 10 }}>
      <Col xs={24}>
        <Divider>주문</Divider>
      </Col>
      <Col xs={24}>
        <Row gutter={16} style={{ padding: 10 }}>
          <Col xs={6}>
            <Checkbox onChange={checkAll} />{" "}
            <Button size="small" onClick={checkDelete}>
              선택삭제
            </Button>
          </Col>
        </Row>

        <Row gutter={16} style={{ padding: 10 }}>
          <Col xs={24}>
            <Card title="주문 내역">
              {orders.length === 0 && (
                <Row gutter={16} style={{ padding: 10 }}>
                  <Col xs={24}>주문할 상품이 없습니다.</Col>
                </Row>
              )}

              {orders.length > 0 &&
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
                })}
            </Card>
          </Col>
        </Row>

        <Row gutter={16} style={{ padding: 10 }}>
          <Col xs={24}>
            <Card title="주문자 정보">
              <Card type="inner" title="주문자명">
                <Input
                  value={orderName}
                  onChange={(e) => setName(e.target.value)}
                />
              </Card>
              <Card type="inner" title="이메일">
                <Input value={orderEmail} readOnly={true} />
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
                    value={orderPhone}
                    onChange={(e) => setPhone(phoneNumber(e.target.value))}
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
                {deliveryText}
              </Card>
            </Card>
          </Col>
        </Row>

        <Row gutter={16} style={{ padding: 10 }}>
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
        </Row>
        <Row gutter={16}>
          <Col xs={6} offset={9}>
            <Button type="primary" block onClick={payment}>
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
