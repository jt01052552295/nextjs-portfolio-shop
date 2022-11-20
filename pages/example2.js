import React, { useEffect, useState } from "react";
import { useQuery, useMutation, useQueries } from "@tanstack/react-query";
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
const { TextArea } = Input;

const Example2 = (props) => {
  const [getResult, setGetResult] = useState(null);
  const [getResult2, setGetResult2] = useState(null);
  const fortmatResponse = (res) => {
    return JSON.stringify(res, null, 2);
  };

  const results = useQueries({
    queries: [
      {
        queryKey: ["post", 1],
        queryFn: async (params) => {
          return await axios.get(
            `https://jsonplaceholder.typicode.com/posts/${params.queryKey[1]}`
          );
        },
        enabled: true,
        retry: 0,
        onSuccess: (res) => {
          const result = {
            status: res.status,
            headers: res.headers,
            data: res.data,
          };

          setGetResult(fortmatResponse(result));
        },
        onError: (err) => {
          setGetResult(fortmatResponse(err.response?.data || err));
        },
      },
      {
        queryKey: ["post", 2],
        queryFn: async (params) => {
          return await axios.get(
            `https://jsonplaceholder.typicode.com/posts/${params.queryKey[1]}`
          );
        },
        enabled: true,
        retry: 0,
        onSuccess: (res) => {
          const result = {
            status: res.status,
            headers: res.headers,
            data: res.data,
          };

          setGetResult2(fortmatResponse(result));
        },
        onError: (err) => {
          setGetResult2(fortmatResponse(err.response?.data || err));
        },
      },
    ],
  });

  useEffect(() => {
    console.log(results);
    results.map((x) => console.log(x));
  }, [results]);

  function getAllData() {
    try {
      getAllTutorials();
    } catch (err) {
      setGetResult(fortmatResponse(err));
    }
  }

  return (
    <div className="max-container">
      <AppLayout>
        <Row gutter={16} style={{ padding: 10 }}>
          <Col xs={24}>
            <Divider>React Query Axios Example</Divider>
          </Col>

          <Col xs={24}>
            {getResult && (
              <div className="view-json-result">
                <pre>{getResult}</pre>
              </div>
            )}
          </Col>
          <Col xs={24}>
            {getResult2 && (
              <div className="view-json-result">
                <pre>{getResult2}</pre>
              </div>
            )}
          </Col>
        </Row>
      </AppLayout>
    </div>
  );
};

Example2.propTypes = {};

export default Example2;
