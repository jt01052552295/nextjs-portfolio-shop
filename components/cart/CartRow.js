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
  Avatar,
  Skeleton,
  Checkbox,
} from "antd";
const { Meta } = Card;
import { PlusOutlined, MinusOutlined, DeleteOutlined } from "@ant-design/icons";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  cartListState,
  cartListStatsState,
  cartListCheckedState,
} from "../../atoms";

const formatter = Intl.NumberFormat("ko-kr");

const CartRow = ({ rowkey, item, cart }) => {
  const [index, setIndex] = useState(null);
  const [cartData, setCartData] = useRecoilState(cartListState);
  const { cartList } = useRecoilValue(cartListStatsState);
  const [cartChecked, setCartChecked] = useRecoilState(cartListCheckedState);

  useEffect(() => {
    setIndex(item?.idx);
  }, []);

  const checkRow = (e) => {
    const isChecked = e.target.checked;
    const find_index = cartList.findIndex((x) => x.item === cart.item);
    let arr = [...cartChecked];
    arr[find_index] = isChecked;
    setCartChecked(arr);
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
      <Card
        type="inner"
        title={item?.name}
        style={{
          marginBottom: 16,
        }}
        actions={[
          <Checkbox onChange={checkRow} checked={cartChecked[rowkey]} />,
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
          </Input.Group>,
          <Button
            size="small"
            type="primary"
            icon={<DeleteOutlined />}
            danger
            onClick={removeCartRow}
          />,
        ]}
      >
        <Meta
          avatar={<Avatar src={item.image} />}
          title={`${formatter.format(cart.price)}원`}
          description={`${formatter.format(item.price)}원`}
        />
      </Card>
    );
  }
};

CartRow.propTypes = {
  rowkey: PropTypes.number.isRequired,
  item: PropTypes.object,
  cart: PropTypes.object.isRequired,
};

export default CartRow;
