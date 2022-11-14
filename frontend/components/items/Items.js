import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import axios from "axios";
import ItemSkeleton from "./ItemSkeleton";
import Item from "./Item";
import { Button, Radio, Row, Col } from "antd";

const itemsJson = "/mock/items.json";
const Items = (props) => {
  const [size, setSize] = useState("idx");
  const [items, setItems] = useState([]);
  useEffect(() => {
    axios(itemsJson).then((res) => {
      // console.log(res.data.items);
      setItems(res.data.items);
    });
  }, []);

  useEffect(() => {
    let arr = [...items];
    if (size === "sale") {
      setItems(arr.sort((a, b) => b.sale - a.sale));
    } else if (size === "price1") {
      setItems(arr.sort((a, b) => b.price - a.price));
    } else if (size === "price2") {
      setItems(arr.sort((a, b) => a.price - b.price));
    } else if (size === "idx") {
      setItems(arr.sort((a, b) => b.idx - a.idx));
    }
  }, [size]);

  return (
    <div className="items">
      <Row justify="end">
        <Col
          span={13}
          style={{ textAlign: "right", paddingBottom: 10, paddingRight: 10 }}
        >
          <Radio.Group value={size} onChange={(e) => setSize(e.target.value)}>
            <Radio.Button value="sale">판매량순</Radio.Button>
            <Radio.Button value="price1">높은가격순</Radio.Button>
            <Radio.Button value="price2">낮은가격순</Radio.Button>
            <Radio.Button value="idx">최신순</Radio.Button>
          </Radio.Group>
        </Col>
      </Row>

      <div className="site-card-wrapper">
        <Row gutter={16}>
          {items.length === 0 &&
            Array.from(Array(12)).map((i) => {
              let ran = Math.random();
              return <ItemSkeleton key={`key-${ran}`} />;
            })}
          {items.length > 0 &&
            items.map((item) => {
              return <Item key={`key-${item.idx}`} item={item} />;
            })}
        </Row>
      </div>
    </div>
  );
};

Items.propTypes = {};

export default Items;
