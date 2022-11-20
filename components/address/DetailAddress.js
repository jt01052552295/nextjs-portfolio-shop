import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Form, Input, Radio, Divider } from "antd";
import { useRecoilState, useRecoilValue } from "recoil";
import { locationState, addressState } from "../../atoms";

const DetailAddress = (props) => {
  const [form] = Form.useForm();
  const [address, setAddressState] = useRecoilState(addressState);

  useEffect(() => {
    form.setFieldsValue({
      addr1: address.address,
      addr2: address?.address2,
    });
  }, [form]);

  const onFinish = (values) => {
    setAddressState((prev) => ({
      ...prev,
      address2: values.addr2,
      delivery: values.addr1 + " " + values.addr2,
    }));
  };

  return (
    <Form
      form={form}
      initialValues={
        {
          // layout: formLayout,
        }
      }
      onFinish={onFinish}
    >
      <Divider>상세주소 입력</Divider>
      <Form.Item label="기본주소" name="addr1">
        <Input placeholder="입력" />
      </Form.Item>
      <Form.Item
        label="상세주소"
        name="addr2"
        rules={[
          {
            required: true,
            message: "상세주소를 입력하세요.",
          },
        ]}
      >
        <Input placeholder="입력" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          주소적용
        </Button>
      </Form.Item>
    </Form>
  );
};

DetailAddress.propTypes = {};

export default DetailAddress;
