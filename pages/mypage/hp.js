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
import { UserOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";
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
import { phoneNumber } from "../../utils";

const Hp = (props) => {
  const [form] = Form.useForm();
  const [user, setUserState] = useRecoilState(userState);
  const [userInfo, setUserInfo] = useState(null);
  const [orderPhone, setPhone] = useState("");

  useEffect(() => {
    setUserInfo(user);
  }, [user]);

  useEffect(() => {
    console.log(userInfo);
    form.setFieldsValue({
      email: userInfo?.email,
      hp: userInfo?.hp,
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
          alert("정보가 변경되었습니다.");
        }
      },
      onSettled: () => {
        console.log("end");
      },
    }
  );

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    userMutation.mutate(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <AppLayout title="연락처변경 | 개인쇼핑몰 v1.0" description="설명..">
      <Row>
        <Col xs={24}>
          <Divider>연락처 변경</Divider>
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
              hp: "",
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
              name="hp"
              rules={[
                {
                  type: "text",
                  message: "The input is not valid hp!",
                },
                {
                  required: true,
                  message: "Please input your hp!",
                },
              ]}
            >
              <Input
                prefix={<PhoneOutlined className="site-form-item-icon" />}
                placeholder="연락처"
                value={orderPhone}
                onChange={(e) =>
                  form.setFieldsValue({
                    hp: phoneNumber(e.target.value),
                  })
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

Hp.propTypes = {};

export default Hp;
