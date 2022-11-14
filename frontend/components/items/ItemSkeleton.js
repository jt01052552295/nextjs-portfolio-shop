import React from "react";
import PropTypes from "prop-types";
import { Button, Radio, Row, Col, Card } from "antd";
const { Meta } = Card;

const ItemSkeleton = (props) => {
  return (
    <Col span={12}>
      <Card style={{ marginBottom: 10 }} loading={true}>
        <div className="category">
          <span>category</span>
        </div>

        <div className="item_price">
          <span className="price">price</span>
          <span className="unit">WON</span>
        </div>
      </Card>
    </Col>
  );
};

ItemSkeleton.propTypes = {};

export default ItemSkeleton;
