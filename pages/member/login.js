import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import SingleLayout from "../../components/SingleLayout";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import {
  LockOutlined,
  MailOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { Row, Col, Layout, Button, Checkbox, Form, Input } from "antd";
import { useMutation } from "@tanstack/react-query";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { userState, USER_ATOM_KEY } from "../../atoms";
import { useRouter } from "next/router";

const Login = (props) => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [user, setUserState] = useRecoilState(userState);

  useEffect(() => {
    form.setFieldsValue({
      email: "test@test.com",
      password: "1111",
    });
  }, [form]);

  const loginMutation = useMutation(
    async (variable) => {
      // console.log("async", variable);
      return await axios.post("/api/user/signin", variable);
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
        //console.log(data);
        setUserState(data.data);
        const returnUrl = router.query.returnUrl || "/";
        router.replace(returnUrl);
      },
      onSettled: () => {
        console.log("end");
      },
    }
  );

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    loginMutation.mutate(values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="max-container">
      <SingleLayout>
        <Layout style={{ height: "100vh" }}>
          <Row>
            <Col
              xs={16}
              offset={4}
              style={{ textAlign: "center", marginBottom: 50, marginTop: 50 }}
            >
              <Link href="/">
                <Image
                  src="/images/vercel.svg"
                  alt="Logo"
                  width={283}
                  height={64}
                  style={{ maxWidth: "100%" }}
                />
              </Link>
            </Col>
          </Row>
          <Row>
            <Col xs={16} offset={4}>
              <Form
                form={form}
                name="normal_login"
                className="login-form"
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
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
                    placeholder="input password"
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                  />
                </Form.Item>
                <Form.Item>
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                  </Form.Item>

                  {/* <a className="login-form-forgot" href="">
                    Forgot password
                  </a> */}
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                    loading={loginMutation.isLoading}
                  >
                    Log in
                  </Button>
                  Or <Link href="/member/sign-up">register now!</Link>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Layout>
      </SingleLayout>
    </div>
  );
};

Login.propTypes = {};

export default Login;
