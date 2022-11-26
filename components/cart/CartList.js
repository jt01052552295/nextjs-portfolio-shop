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
import {
  cartListState,
  cartListStatsState,
  cartListCheckedState,
} from "../../atoms";
import { useItems } from "../../query/item";
import CartRow from "./CartRow";

const formatter = Intl.NumberFormat("ko-kr");

const CartList = (props) => {
  const { cartList, totalStock, totalPrice } =
    useRecoilValue(cartListStatsState);
  const [cartData, setCartData] = useRecoilState(cartListState);
  const [cartTotalNum, setCartTotalNum] = useState(0);
  const [cartTotalStock, setCartTotalStock] = useState(0);
  const [cartTotalPrice, setCartTotalPrice] = useState(0);

  const [cartChecked, setCartChecked] = useRecoilState(cartListCheckedState);

  const { isLoading: isLoading, status: status, data: data } = useItems();

  const [carts, setCarts] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (status === "success") {
      setItems(data?.data.items);
    }
  }, [status]);

  useEffect(() => {
    setCarts(cartList);
    setCartTotalStock(totalStock);
    setCartTotalPrice(totalPrice);
  }, [cartData]);

  const checkAll = (e) => {
    let arr = [...cartData];
    const newArr = arr.map((x) => {
      return e.target.checked;
    });
    setCartChecked(newArr);
  };

  const checkDelete = (e) => {
    let arr = [...cartChecked];
    let newList = [...cartList];

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
    setCartData(diffrence);
    setCartChecked([]);
  };

  const goOrder = (e) => {
    if (!confirm("장바구니상품을 주문 하시겠습니까?")) return false;

    console.log("order");
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
            <Button size="small" onClick={checkDelete}>
              선택삭제
            </Button>
          </Col>
          <Col xs={6}>상품정보</Col>
          <Col xs={6}>수량</Col>
          <Col xs={6}>상품금액(원)</Col>
        </Row>

        {carts.length === 0 && (
          <Row gutter={16} style={{ padding: 10 }}>
            <Col xs={24}>담긴 상품이 없습니다.</Col>
          </Row>
        )}

        {carts.length > 0 &&
          carts.map((cart, key) => {
            let item = items?.find((x) => x.idx === cart.item);

            return <CartRow key={key} rowkey={key} item={item} cart={cart} />;
          })}

        <Row gutter={16} style={{ padding: 10 }}>
          <Col xs={24}>
            <Card title="장바구니 정보">
              <Card type="inner" title="전체 상품금액(원)">
                {formatter.format(cartTotalPrice)}
              </Card>
              <Card
                style={{
                  marginTop: 16,
                }}
                type="inner"
                title="전체 수량(개)"
              >
                {cartTotalStock}
              </Card>
              <Card
                style={{
                  marginTop: 16,
                }}
                type="inner"
                title="결제 예정 금액(원)"
              >
                {formatter.format(cartTotalPrice)}
              </Card>
            </Card>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col xs={6} offset={9}>
            <Button type="primary" block onClick={goOrder}>
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
