import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import AppLayout from "../../components/AppLayout";
import {
  Row,
  Col,
  Layout,
  Button,
  Checkbox,
  Form,
  Input,
  Typography,
  Divider,
} from "antd";
const { Title } = Typography;
import {
  LockOutlined,
  MailOutlined,
  UserOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import {
  useQuery,
  useMutation,
  useQueries,
  useQueryClient,
} from "@tanstack/react-query";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { userState, USER_ATOM_KEY } from "../../atoms";
import { useRouter } from "next/router";
import axios from "axios";

const Signout = (props) => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [user, setUserState] = useRecoilState(userState);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    setUserInfo(user);
  }, [user]);

  useEffect(() => {
    form.setFieldsValue({
      email: userInfo?.email,
      age: 0,
    });
  }, [userInfo, form]);

  const userMutation = useMutation(
    async (variable) => {
      console.log("async", variable);
      return await axios.post("/api/user/update", variable);
    },
    {
      onMutate: (variable) => {
        console.log("onMutate", variable);
        // variable : {loginId: 'xxx', password; 'xxx'}
      },
      onError: (error, variable, context) => {
        // error
      },
      onSuccess: (data, variables, context) => {
        console.log(data.data);
        if (data.data.success) {
          setUserState(data.data);
          alert("계정이 탈퇴처리 되었습니다.");
          router.replace("/");
        }
      },
      onSettled: () => {
        console.log("end");
      },
    }
  );

  const onFinish = (values) => {
    let send = { ...values, age: 0, password: "" };
    console.log("Received values of form: ", send);
    userMutation.mutate(send);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <AppLayout title="계정탈퇴 | 개인쇼핑몰 v1.0" description="설명..">
      <Row>
        <Col xs={24}>
          <Divider>계정탈퇴</Divider>
        </Col>
      </Row>
      <Row>
        <Col xs={16} offset={4}>
          <Form
            form={form}
            name="normal_login"
            className="sign-form"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            initialValues={{
              name: "",
            }}
          >
            <Form.Item
              name="email"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="email"
                readOnly
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="비밀번호 입력"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={userMutation.isLoading}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </AppLayout>
  );
};

Signout.propTypes = {};

export default Signout;
