import React from "react";
import PropTypes from "prop-types";
import AppLayout from "../../components/AppLayout";
import { Row, Col, Card, Avatar, List, Button, Result } from "antd";
import Link from "next/link";

const Cs = (props) => {
  return (
    <div className="max-container">
      <AppLayout>
        <Result
          status="success"
          title="고객센터"
          subTitle="준비중 입니다."
          extra={<Link href="/">Home</Link>}
        />
      </AppLayout>
    </div>
  );
};

Cs.propTypes = {};

export default Cs;
