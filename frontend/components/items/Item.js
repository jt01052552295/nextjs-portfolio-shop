import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import Image from "next/image";

const Item = ({ item }) => {
  //console.log(item);
  return (
    <div className="item">
      <Link href={`/item/${item.idx}`}>
        <div className="img">
          <Image
            src={`${item.image}`}
            width="200"
            height="200"
            className=" card-img-top  "
            alt="card-image"
          />
        </div>
      </Link>
      <div className="category">
        <span>{item.category}</span>
      </div>

      <div className="name">
        <span>{item.name}</span>
      </div>

      <div className="item_price">
        <span className="price">{item.price}</span>
        <span className="unit">원</span>
      </div>
    </div>
  );
};

Item.propTypes = { item: PropTypes.object.isRequired };

export default Item;
