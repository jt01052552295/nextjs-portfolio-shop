import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { LoadingOutlined } from "@ant-design/icons";
import { Result, Layout, Row, Col } from "antd";

const Loading = (props) => {
  return (
    <Layout style={{ opacity: "0.5" }}>
      <Row justify="center" align="middle" style={{ height: "100vh" }}>
        <Col flex="auto">
          <Result
            icon={<LoadingOutlined style={{ fontSize: "26px" }} />}
            title="Please wait..."
          />
        </Col>
      </Row>
    </Layout>
  );
};

Loading.propTypes = {};

export default Loading;
