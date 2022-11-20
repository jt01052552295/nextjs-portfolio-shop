import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
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

const Example = (props) => {
  const [getResult, setGetResult] = useState(null);
  const [getId, setGetId] = useState("");
  const fortmatResponse = (res) => {
    return JSON.stringify(res, null, 2);
  };
  const { isLoading: isLoadingTutorials, refetch: getAllTutorials } = useQuery(
    ["query-tutorials"],
    async () => {
      return await axios.get("https://jsonplaceholder.typicode.com/posts");
    },
    {
      enabled: false,
      onSuccess: (res) => {
        const result = {
          status: res.status,
          headers: res.headers,
          data: res.data,
        };

        setGetResult(fortmatResponse(result));
        console.log(getResult);
      },
      onError: (err) => {
        setGetResult(fortmatResponse(err.response?.data || err));
      },
    }
  );

  useEffect(() => {
    if (isLoadingTutorials) setGetResult("loading...");
  }, [isLoadingTutorials]);

  function getAllData() {
    try {
      getAllTutorials();
    } catch (err) {
      setGetResult(fortmatResponse(err));
    }
  }

  const { isLoading: isLoadingTutorial, refetch: getTutorialById } = useQuery(
    ["query-tutorial-by-id"],
    async () => {
      return await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${getId}`
      );
    },
    {
      enabled: false,
      onSuccess: (res) => {
        const result = {
          status: res.status,
          headers: res.headers,
          data: res.data,
        };

        setGetResult(fortmatResponse(result));
        console.log(getResult);
      },
      onError: (err) => {
        setGetResult(fortmatResponse(err.response?.data || err));
      },
    }
  );

  useEffect(() => {
    if (isLoadingTutorial) setGetResult("loading...");
  }, [isLoadingTutorial]);

  const getDataById = (value) => {
    if (value) {
      try {
        setGetId(value);
        getTutorialById();
      } catch (err) {
        setGetResult(fortmatResponse(err));
      }
    }
  };
  return (
    <div className="max-container">
      <AppLayout>
        <Row gutter={16} style={{ padding: 10 }}>
          <Col xs={24}>
            <Divider>React Query Axios Example</Divider>
          </Col>
          <Col xs={4}>
            <Button type="primary" onClick={getAllData}>
              Get All
            </Button>
          </Col>
          <Col xs={16}>
            <Search
              placeholder="input"
              onSearch={getDataById}
              enterButton="Get by ID"
            />
          </Col>

          <Col xs={4}>
            <Button
              onClick={() => {
                setGetResult(null);
              }}
            >
              Clear
            </Button>
          </Col>
          <Col xs={24}>
            {getResult && (
              <div className="view-json-result">
                <pre>{getResult}</pre>
              </div>
            )}
          </Col>
        </Row>
      </AppLayout>
    </div>
  );
};

Example.propTypes = {};

export default Example;
