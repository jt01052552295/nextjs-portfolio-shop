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
  orderListState,
  orderListStatsState,
  orderListCheckedState,
} from "../../atoms";

const formatter = Intl.NumberFormat("ko-kr");

const OrderRow = ({ rowkey, item, order }) => {
  const [orderData, setOrderData] = useRecoilState(orderListState);
  const { orderList } = useRecoilValue(orderListStatsState);
  const [orderChecked, setOrderChecked] = useRecoilState(orderListCheckedState);

  useEffect(() => {
    //console.log(rowkey, item);
  }, []);

  const checkRow = (e) => {
    const isChecked = e.target.checked;
    const find_index = orderList.findIndex((x) => x.item === order.item);
    let arr = [...orderChecked];
    arr[find_index] = isChecked;
    setOrderChecked(arr);
  };

  const addStockRow = (e) => {
    let arr = [...orderList];
    const newList = arr.map((obj) => {
      if (obj.item === order.item) {
        let stock = order.stock + 1;
        let price = stock * item.price;
        return { ...order, stock: stock, price: price };
      }
      return obj;
    });
    setOrderData(newList);
  };

  const removeStockRow = (e) => {
    let arr = [...orderList];
    const newList = arr.map((obj) => {
      if (obj.item === order.item && order.stock > 1) {
        let stock = order.stock - 1;
        let price = stock * item.price;
        return { ...order, stock: stock, price: price };
      }
      return obj;
    });
    setOrderData(newList);
  };

  const removeRow = (e) => {
    const find_index = orderList.findIndex((x) => x.item === order.item);
    let newList = [...orderList];
    newList.splice(find_index, 1);
    setOrderData(newList);
  };

  if (!item) {
    return (
      <Row gutter={16} style={{ padding: 10 }}>
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
          <Checkbox onChange={checkRow} checked={orderChecked[rowkey]} />,
          <Input.Group compact>
            <Button
              icon={<PlusOutlined />}
              size="small"
              onClick={addStockRow}
            />
            <Input
              style={{ width: "40px", textAlign: "center" }}
              defaultValue={order.stock}
              value={order.stock}
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
            onClick={removeRow}
          />,
        ]}
      >
        <Meta
          avatar={<Avatar src={item.image} />}
          title={`${formatter.format(order.price)}원`}
          description={`${formatter.format(item.price)}원`}
        />
      </Card>
    );
  }
};

OrderRow.propTypes = {
  rowkey: PropTypes.number.isRequired,
  item: PropTypes.object,
  order: PropTypes.object.isRequired,
};

export default OrderRow;
