import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import PropTypes from "prop-types";
import SingleLayout from "../../components/SingleLayout";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import {
  LockOutlined,
  MailOutlined,
  UserOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { Row, Col, Layout, Button, Checkbox, Form, Input } from "antd";
import { makeRandString } from "../../utils";

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const SignUp = (props) => {
  const [generateName, setGenerateName] = useState(makeRandString(8));
  const [form] = Form.useForm();

  useEffect(() => {
    setGenerateName(makeRandString());
    form.setFieldsValue({
      name: generateName,
      email: "test@test.com",
      password: "1111",
      confirm: "1111",
    });
  }, [form]);

  const onFinish = (values) => {
    console.log("Received values of form: ", values);

    try {
      axios
        .post("/api/user/signup", values)
        .then((res) => {
          console.log(res.data);
        })
        .catch((error) => console.error(error.message));
    } catch (error) {
      console.log(error);
      // alert(error.response?.data?.message ?? error.message ?? '서버와 통신에 실패했습니다.');
    }
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
                form={form}
                name="normal_login"
                className="sign-form"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                initialValues={{
                  agreement: true,
                  name: generateName,
                }}
              >
                <Form.Item
                  name="name"
                  rules={[
                    {
                      type: "name",
                      message: "The input is not valid name!",
                    },
                    {
                      required: true,
                      message: "Please input your name!",
                    },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="name"
                  />
                </Form.Item>
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
