import React from "react";
import PropTypes from "prop-types";
import { Button, Result } from "antd";
import { useRouter } from "next/router";

const CompleteList = ({ uid }) => {
  const router = useRouter();
  console.log("uid", uid);
  return (
    <div>
      <Result
        status="success"
        title="주문 결제가 완료되었습니다!"
        subTitle={`주문번호 : ${uid}`}
        extra={[
          <Button
            type="primary"
            key="console"
            onClick={(e) => router.replace("/")}
          >
            Go Home
          </Button>,
          <Button key="buy" onClick={(e) => router.replace("/")}>
            My Page
          </Button>,
        ]}
      />
    </div>
  );
};

CompleteList.propTypes = {};

export default CompleteList;
