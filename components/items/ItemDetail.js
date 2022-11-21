import React, { useEffect, useState, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { Row, Col, Card, Button, Space, Input, InputNumber } from "antd";
const { Meta } = Card;
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";

const formatter = Intl.NumberFormat("ko-kr");

const ItemDetail = ({ item }) => {
  const [cartData, setCartData] = useState([]);
  const [itemCount, setItemCount] = useState(1);
  const [itemPrice, setItemPrice] = useState(0);

  useEffect(() => {
    console.log("ItemDetail", item);
    setItemPrice(item.price);
  }, [item]);

  // 함수가 매번 만들어지는게 아닌, 특정 시점에서 함수가 만들어짐. (orderData가 변경될때만)
  const add = useCallback(() => {
    setItemCount(itemCount + 1);
    // let price = itemCount * item.price;
    // setItemPrice(price);
    // setOrderData({ ...orderData, [key]: orderData[key] + 1 });
  }, [itemCount]);

  const remove = useCallback(() => {
    if (itemCount > 1) {
      setItemCount(itemCount - 1);
      // let price = itemCount * item.price;
      // setItemPrice(price);
    }
    // setOrderData({ ...orderData, [key]: orderData[key] - 1 });
  }, [itemCount]);

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
                <Button>장바구니</Button>
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
