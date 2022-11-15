import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import AppLayout from "../components/AppLayout";
import {
  Row,
  Col,
  Card,
  Button,
  Space,
  Input,
  InputNumber,
  Divider,
  Checkbox,
} from "antd";
const { Search } = Input;

const addressJson = "/mock/address.json";

const location = (props) => {
  const [showDetail, setShowDetail] = useState(false);

  const [addresses, setAddress] = useState({});
  useEffect(() => {
    axios(addressJson).then((res) => {
      setAddress(res.data.body);
    });
    console.log(addresses);
  }, []);

  const searchAddr = (value) => {
    setShowDetail(false);
    console.log(value);
  };
  return (
    <div className="max-container">
      <AppLayout>
        <Row gutter={16} style={{ padding: 10 }}>
          <Col xs={24}>
            <Divider>주소설정</Divider>
          </Col>
          <Col xs={24}>
            <Search
              placeholder="input search text"
              onSearch={searchAddr}
              enterButton
            />
          </Col>
        </Row>
      </AppLayout>
    </div>
  );
};

location.propTypes = {};

export default location;
