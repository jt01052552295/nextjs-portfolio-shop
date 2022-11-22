import React, { useEffect, useState, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { Row, Col, Card, Button, Space, Input, InputNumber } from "antd";
const { Meta } = Card;
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { useRecoilState, useRecoilValue } from "recoil";
import { cartListState } from "../../atoms";

const formatter = Intl.NumberFormat("ko-kr");

const ItemDetail = ({ item }) => {
  const [cartData, setCartData] = useRecoilState(cartListState);
  const [itemCount, setItemCount] = useState(1);
  const [itemPrice, setItemPrice] = useState(0);

  useEffect(() => {
    setItemPrice(item.price);
  }, [item]);

  const add = useCallback(() => {
    setItemCount(itemCount + 1);
  }, [itemCount]);

  const remove = useCallback(() => {
    if (itemCount > 1) {
      setItemCount(itemCount - 1);
    }
  }, [itemCount]);

  useEffect(() => {
    let price = itemCount * item.price;
    setItemPrice(price);
  }, [itemCount]);

  const addCartItem = () => {
    if (confirm("장바구니에 추가하시겠습니까?")) {
      let obj = {
        item: item.idx,
        stock: itemCount,
        price: itemPrice,
      };

      let item_index = cartData.findIndex((x) => x.item === obj.item);

      if (item_index > -1) {
        let prev = [...cartData];
        const new_list = [...prev.splice(0, item_index), obj];
        setCartData(new_list);
      } else {
        setCartData((prev) => [...prev, obj]);
      }
    }
  };

  return (
    <Row gutter={16} style={{ padding: 10 }}>
      <Col xs={24}>
        <Card cover={<img alt="pizza" src={item.image} />}>
          <Meta title={item.name} description={item.category} />
          <Card
            type="inner"
            style={{
              marginTop: 16,
            }}
            title="가격(원)"
          >
            {formatter.format(item.price)}
          </Card>
          <Card
            type="inner"
            style={{
              marginTop: 16,
            }}
            title="수량"
          >
            <Input.Group compact>
              <Button icon={<PlusOutlined />} onClick={() => add()} />
              <Input
                style={{ width: "50px", textAlign: "center" }}
                defaultValue={1}
                value={itemCount}
              />
              <Button icon={<MinusOutlined />} onClick={() => remove()} />
            </Input.Group>
          </Card>
          <Card
            type="inner"
            style={{
              marginTop: 16,
            }}
            title="총 금액"
          >
            {formatter.format(itemPrice)}
          </Card>

          <Card
            style={{
              marginTop: 16,
            }}
          >
            <Row gutter={16} justify="center">
              <Space size="large">
                <Button onClick={addCartItem}>장바구니</Button>
                <Button type="primary">바로 구매</Button>
              </Space>
            </Row>
          </Card>
        </Card>
      </Col>
    </Row>
  );
};

ItemDetail.propTypes = { item: PropTypes.object.isRequired };

export default ItemDetail;
