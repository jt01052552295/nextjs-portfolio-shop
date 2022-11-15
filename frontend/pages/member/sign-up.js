import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import SingleLayout from "../../components/SingleLayout";
import Link from "next/link";
import Image from "next/image";

import {
  LockOutlined,
  MailOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { Row, Col, Layout, Button, Checkbox, Form, Input } from "antd";

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const SignUp = (props) => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
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
                />
              </Link>
            </Col>
          </Row>
          <Row>
            <Col xs={16} offset={4}>
              <Form
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

                <Form.Item
                  name="confirm"
                  dependencies={["password"]}
                  rules={[
                    {
                      required: true,
                      message: "Please confirm your password!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error(
                            "The two passwords that you entered do not match!"
                          )
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    placeholder="confirm password"
                  />
                </Form.Item>

                <Form.Item
                  name="agreement"
                  valuePropName="checked"
                  rules={[
                    {
                      validator: (_, value) =>
                        value
                          ? Promise.resolve()
                          : Promise.reject(
                              new Error("Should accept agreement")
                            ),
                    },
                  ]}
                >
                  <Checkbox>
                    {" "}
                    I have read the <Link href="/agreement">agreement</Link>
                  </Checkbox>
                </Form.Item>

                <Form.Item {...tailLayout}>
                  <Button type="primary" htmlType="submit">
                    Register
                  </Button>
                  {` `}
                  <Button
                    htmlType="button"
                    onClick={(e) => (location.href = "/")}
                  >
                    Home
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Layout>
      </SingleLayout>
    </div>
  );
};

SignUp.propTypes = {};

export default SignUp;
