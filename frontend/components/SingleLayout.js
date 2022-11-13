import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Layout } from "antd";
const { Content } = Layout;

const SingleLayout = ({ children }) => {
  return (
    <Layout>
      <Row gutter={[8, 8]} justify="center">
        <Col xs={24}>
          <Content>{children}</Content>
        </Col>
      </Row>
    </Layout>
  );
};

SingleLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SingleLayout;
