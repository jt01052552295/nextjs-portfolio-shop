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
  InputNumber,
  Skeleton,
  Checkbox,
} from "antd";
import { PlusOutlined, MinusOutlined, DeleteOutlined } from "@ant-design/icons";
import { useRecoilState, useRecoilValue } from "recoil";
import { cartListState, cartListStatsState } from "../../atoms";

const formatter = Intl.NumberFormat("ko-kr");

const CartRow = ({ item, cart }) => {
  const [index, setIndex] = useState(null);
  const [cartData, setCartData] = useRecoilState(cartListState);
  const { cartList } = useRecoilValue(cartListStatsState);

  useEffect(() => {
    setIndex(item?.idx);
  }, []);

  const checkRow = (e) => {
    if (e.target.checked) {
      const find_index = cartList.findIndex((x) => x.item === cart.item);
      console.log(cart);
      console.log(item);
      console.log(find_index);
    }
  };

  const addStockRow = (e) => {
    let arr = [...cartList];
    const newList = arr.map((obj) => {
      if (obj.item === cart.item) {
        let stock = cart.stock + 1;
        let price = stock * item.price;
        return { ...cart, stock: stock, price: price };
      }
      return obj;
    });
    setCartData(newList);
  };

  const removeStockRow = (e) => {
    let arr = [...cartList];
    const newList = arr.map((obj) => {
      if (obj.item === cart.item && cart.stock > 1) {
        let stock = cart.stock - 1;
        let price = stock * item.price;
        return { ...cart, stock: stock, price: price };
      }
      return obj;
    });
    setCartData(newList);
  };

  const removeCartRow = (e) => {
    const find_index = cartList.findIndex((x) => x.item === cart.item);
    let newList = [...cartList];
    newList.splice(find_index, 1);
    setCartData(newList);
  };

  if (!item) {
    return (
      <Row key={`key-${v1()}`} gutter={16} style={{ padding: 10 }}>
        <Col xs={24}>
          <Skeleton.Input active block={true} />
        </Col>
      </Row>
    );
  }

  if (item) {
    return (
      <Row key={`key-${item?.idx}`} gutter={16} style={{ padding: 10 }}>
        <Col xs={6}>
          {" "}
          <Checkbox onChange={checkRow} /> {item?.idx}
        </Col>
        <Col xs={6}>{item?.name}</Col>
        <Col xs={6}>
          <Input.Group compact>
            <Button
              icon={<PlusOutlined />}
              size="small"
              onClick={addStockRow}
            />
            <Input
              style={{ width: "40px", textAlign: "center" }}
              defaultValue={cart.stock}
              value={cart.stock}
              size="small"
            />
            <Button
              icon={<MinusOutlined />}
              size="small"
              onClick={removeStockRow}
            />
          </Input.Group>
        </Col>
        <Col xs={6}>
          {formatter.format(cart.price)}{" "}
          <Button
            size="small"
            type="primary"
            icon={<DeleteOutlined />}
            danger
            onClick={removeCartRow}
          />
        </Col>
      </Row>
    );
  }
};

CartRow.propTypes = {};

export default CartRow;
