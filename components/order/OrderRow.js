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

const OrderRow = ({ rowkey, item, order }) => {
  useEffect(() => {
    console.log(rowkey, item);
  }, []);

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
          <Checkbox />,
          <Input.Group compact>
            <Button icon={<PlusOutlined />} size="small" />
            <Input
              style={{ width: "40px", textAlign: "center" }}
              defaultValue={order.stock}
              value={order.stock}
              size="small"
            />
            <Button icon={<MinusOutlined />} size="small" />
          </Input.Group>,
          <Button
            size="small"
            type="primary"
            icon={<DeleteOutlined />}
            danger
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
  item: PropTypes.object.isRequired,
  order: PropTypes.object.isRequired,
};

export default OrderRow;
