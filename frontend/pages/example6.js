import React, { useEffect, useState } from "react";
import {
  useQuery,
  useMutation,
  useQueries,
  useQueryClient,
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
import { authService } from "../service/auth";
import {
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
} from "recoil";
import { userState, USER_ATOM_KEY } from "../atoms";
import useRouter from "next/router";

const example6 = (props) => {
  const [id, setId] = useState("Sincere@april.biz");
  const [password, setPassword] = useState("aaaa");
  const queryClient = useQueryClient();
  const [user, setUserState] = useRecoilState(userState);
  const resetUser = useResetRecoilState(userState);

  const loginMutation = useMutation(authService.login, {
    onMutate: (variable) => {
      console.log("onMutate", variable);
      // variable : {loginId: 'xxx', password; 'xxx'}
    },
    onError: (error, variable, context) => {
      // error
    },
    onSuccess: (data, variables, context) => {
      console.log(data);
      setUserState(data.data);
    },
    onSettled: () => {
      console.log("end");
    },
  });

  const handleSubmit = () => {
    loginMutation.mutate({ email: id, password: password });
  };

  const clearData = () => {
    Promise.allSettled([resetUser])
      .then((results) => {
        localStorage.removeItem(USER_ATOM_KEY);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {});
  };

  return (
    <div className="max-container">
      <AppLayout>
        <Row gutter={16} style={{ padding: 10 }}>
          <Col xs={24}>
            <Divider>React Query Login Example</Divider>
          </Col>

          <Col xs={24}>
            <Input
              placeholder="input Id"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </Col>
          <Col xs={24}>
            <Input
              placeholder="input password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Col>

          <Col xs={24}>
            <Button type="primary" block onClick={handleSubmit}>
              Login
            </Button>
          </Col>
          <Col xs={24}>
            <Button block onClick={clearData}>
              Logout
            </Button>
          </Col>
          <Col xs={24}>
            {loginMutation.isLoading ? "loading..." : ""}
            {loginMutation.isSuccess ? "success" : "pending"}
            {loginMutation.isError ? "error" : "pending"}
          </Col>
        </Row>
      </AppLayout>
    </div>
  );
};

example6.propTypes = {};

export default example6;
