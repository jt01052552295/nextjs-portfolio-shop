import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Row, Col } from "antd";

const ItemDetail = ({ item }) => {
  useEffect(() => {
    console.log("ItemDetail", item);
  }, [item]);

  return (
    <Row gutter={16} style={{ padding: 10 }}>
      <Col xs={24}>{item.name}</Col>
    </Row>
  );
};

ItemDetail.propTypes = { item: PropTypes.object.isRequired };

export default ItemDetail;
