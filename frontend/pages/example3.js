import React, { useEffect, useState } from "react";
import {
  useQuery,
  useMutation,
  useQueries,
  queryClient,
} from "@tanstack/react-query";
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

const Example3 = (props) => {
  const [postTitle, setPostTitle] = useState("fooaaaa");
  const [postDescription, setPostDescription] = useState("barcccc");
  const [postResult, setPostResult] = useState(null);

  const fortmatResponse = (res) => {
    return JSON.stringify(res, null, 2);
  };

  const { isLoading: isPostingTutorial, mutate: postTutorial } = useMutation(
    async (variable) => {
      // console.log("async", variable);
      return await axios.post(
        `https://jsonplaceholder.typicode.com/posts`,
        variable
      );
    },
    {
      onMutate: (variable) => {
        console.log("onMutate", variable);
      },
      onSuccess: (res, variables, context) => {
        const result = {
          status: res.status,
          headers: res.headers,
          data: res.data,
        };
        console.log("success", res);
        setPostResult(fortmatResponse(result));
      },
      onError: (err, variable, context) => {
        setPostResult(fortmatResponse(err.response?.data || err));
      },
      onSettled: () => {
        console.log("end");
      },
    }
  );

  useEffect(() => {
    if (isPostingTutorial) setPostResult("posting...");
  }, [isPostingTutorial]);

  function postData() {
    try {
      postTutorial({ title: postTitle, body: postDescription, userId: 1 });
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
          <Col xs={6}>
            <Input placeholder="Basic usage" defaultValue={postDescription} />
          </Col>

          <Col xs={4}>
            <Button type="primary" onClick={postData}>
              Send Post
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

Example3.propTypes = {};

export default Example3;
