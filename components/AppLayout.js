import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Row, Col, Layout } from "antd";
const { Content } = Layout;
import Header from "./common/Header";
import Footer from "./common/Footer";
import Head from "next/head";

const AppLayout = ({ children, title, description }) => {
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDesc, setMetaDesc] = useState("");

  useEffect(() => {
    setMetaTitle(title);
    setMetaDesc(description);
  }, []);

  return (
    <div className="max-container">
      <Layout>
        <Head>
          <title>{metaTitle}</title>
          <meta property="og:title" content={metaTitle} />
          <meta name="description" content={metaDesc} />
          <meta name="og:sdescription" content={metaDesc} />
          <meta property="og:type" content="website" />
        </Head>
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
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default AppLayout;
