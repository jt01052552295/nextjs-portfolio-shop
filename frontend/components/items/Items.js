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
              return <ItemSkeleton key={`key-${i}`} />;
            })}
          {items.length > 0 &&
            items.map((item) => {
              return <Item key={`key-${item.name}`} item={item} />;
            })}
        </Row>
      </div>
    </div>
  );
};

Items.propTypes = {};

export default Items;
