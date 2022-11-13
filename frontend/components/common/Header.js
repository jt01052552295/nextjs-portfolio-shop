import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Layout, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const Header = () => {
  return (
    <header className="head">
      <Row
        gutter={[16, 16]}
        align="middle"
        justify="start"
        style={{ height: 50, padding: 10 }}
      >
        <Col flex={2}>Logo</Col>
        <Col>Login</Col>
        <Col>SignUp</Col>
        <Col>Cart</Col>
        <Col>Logout</Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <Input.Search
            prefix={<SearchOutlined style={{ verticalAlign: "middle" }} />}
          />
        </Col>
      </Row>
    </header>
  );
};

Header.propTypes = {};

export default Header;
