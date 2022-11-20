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

const Example4 = (props) => {
  const [postTitle, setPostTitle] = useState("fooooooo");
  const [postResult, setPostResult] = useState(null);

  const fortmatResponse = (res) => {
    return JSON.stringify(res, null, 2);
  };

  const { isLoading: isPostingTutorial, mutate: postTutorial } = useMutation(
    async () => {
      return await axios.patch(`https://jsonplaceholder.typicode.com/posts/1`, {
        title: postTitle,
      });
    },
    {
      onSuccess: (res) => {
        const result = {
          status: res.status,
          headers: res.headers,
          data: res.data,
        };
        console.log(res);
        setPostResult(fortmatResponse(result));
      },
      onError: (err) => {
        setPostResult(fortmatResponse(err.response?.data || err));
      },
    }
  );

  useEffect(() => {
    if (isPostingTutorial) setPostResult("patching...");
  }, [isPostingTutorial]);

  function postData() {
    try {
      postTutorial();
    } catch (err) {
      setPostResult(fortmatResponse(err));
    }
  }

  return (
    <div className="max-container">
      <AppLayout>
        <Row gutter={16} style={{ padding: 10 }}>
          <Col xs={24}>
            <Divider>React Query Axios Example</Divider>
          </Col>

          <Col xs={6}>
            <Input placeholder="Basic usage" defaultValue={postTitle} />
          </Col>

          <Col xs={4}>
            <Button type="primary" onClick={postData}>
              patch
            </Button>
          </Col>
          <Col xs={4}>
            <Button
              onClick={() => {
                setPostResult(null);
              }}
            >
              Clear
            </Button>
          </Col>

          <Col xs={24}>
            {postResult && (
              <div className="view-json-result">
                <pre>{postResult}</pre>
              </div>
            )}
          </Col>
        </Row>
      </AppLayout>
    </div>
  );
};

Example4.propTypes = {};

export default Example4;
