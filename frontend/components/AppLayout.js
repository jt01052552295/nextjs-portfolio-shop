import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Layout } from "antd";
const { Content } = Layout;
import Header from "./common/Header";
import Footer from "./common/Footer";

const AppLayout = ({ children }) => {
  return (
    <Layout>
      <Row gutter={[8, 8]} justify="center">
        <Col xs={24}>
          <Header />
        </Col>
        <Col xs={24}>
          <Content>{children}</Content>
        </Col>
        <Col xs={24}>
          <Footer />
        </Col>
      </Row>
    </Layout>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
