import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import axios from "axios";
import Item from "./Item";

const itemsJson = "/mock/items.json";
const Items = (props) => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    axios(itemsJson).then((res) => {
      console.log(res.data.items);
      setItems(res.data.items);
    });
  }, []);

  return (
    <div className="items">
      <div className="order">
        <p>판매량순</p>
        <p>낮은가격순</p>
        <p>높은가격순</p>
        <p>최신순</p>
      </div>

      {items.map((item) => {
        return <Item key={`key-${item.name}`} item={item} />;
      })}
    </div>
  );
};

Items.propTypes = {};

export default Items;
