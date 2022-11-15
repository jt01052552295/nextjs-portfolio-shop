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
import { PlusOutlined, MinusOutlined, DeleteOutlined } from "@ant-design/icons";

const cartsJson = "/mock/carts.json";
const itemsJson = "/mock/items.json";
const CartList = (props) => {
  const [carts, setCarts] = useState([]);
  const [items, setItems] = useState([]);
  useEffect(() => {
    axios(cartsJson).then((res) => {
      setCarts(res.data.carts);
    });
    axios(itemsJson).then((res) => {
      setItems(res.data.items);
    });
  }, []);

  const checkAll = (e) => {
    console.log(`checkAll = ${e.target.checked}`);
  };

  return (
    <Row gutter={16} style={{ padding: 10 }}>
      <Col xs={24}>
        <Divider>장바구니</Divider>
      </Col>
      <Col xs={24}>
        <Row gutter={16} style={{ padding: 10 }}>
          <Col xs={6}>
            <Checkbox onChange={checkAll} />{" "}
            <Button size="small">선택삭제</Button>
          </Col>
          <Col xs={6}>상품정보</Col>
          <Col xs={6}>수량</Col>
          <Col xs={6}>상품금액</Col>
        </Row>

        {carts.length > 0 &&
          carts.map((cart) => {
            let item = items.find((x) => x.idx === cart.item);

            return (
              <Row key={`key-${cart.idx}`} gutter={16} style={{ padding: 10 }}>
                <Col xs={6}>
                  {" "}
                  <Checkbox />
                </Col>
                <Col xs={6}>{item.name}</Col>
                <Col xs={6}>
                  <Input.Group compact>
                    <Button icon={<PlusOutlined />} size="small" />
                    <Input
                      style={{ width: "40px", textAlign: "center" }}
                      defaultValue={cart.stock}
                      size="small"
                    />
                    <Button icon={<MinusOutlined />} size="small" />
                  </Input.Group>
                </Col>
                <Col xs={6}>
                  {cart.price}{" "}
                  <Button
                    size="small"
                    type="primary"
                    icon={<DeleteOutlined />}
                    danger
                  />
                </Col>
              </Row>
            );
          })}

        <Row gutter={16} style={{ padding: 10 }}>
          <Col xs={24}>
            <Card title="장바구니 정보">
              <Card type="inner" title="전체 상품금액">
                111
              </Card>
              <Card
                style={{
                  marginTop: 16,
                }}
                type="inner"
                title="전체 수량"
              >
                111
              </Card>
              <Card
                style={{
                  marginTop: 16,
                }}
                type="inner"
                title="결제 예정 금액"
              >
                222
              </Card>
            </Card>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={6} offset={9}>
            <Button type="primary" block>
              주문하기
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

CartList.propTypes = {};

export default CartList;
