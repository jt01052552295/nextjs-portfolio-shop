import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import AppLayout from "../../components/AppLayout";
import { Row, Col, Card, Avatar, List } from "antd";
const { Meta } = Card;
import {
  UnorderedListOutlined,
  QuestionCircleOutlined,
  RightOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  userState,
  userSelector,
  USER_ATOM_KEY,
  addressSelector,
} from "../../atoms";
import { useRouter } from "next/router";

const data = [
  {
    title: "주문목록",
    avatar: <UnorderedListOutlined />,
    url: "/mypage/order/list",
  },
  {
    title: "취소목록",
    avatar: <UnorderedListOutlined />,
    url: "/mypage/order/cancel",
  },
  {
    title: "고객센터",
    avatar: <QuestionCircleOutlined />,
    url: "/mypage/cs",
  },
  {
    title: "이름변경",
    avatar: <QuestionCircleOutlined />,
    url: "/mypage/name",
  },
  {
    title: "연락처변경",
    avatar: <QuestionCircleOutlined />,
    url: "/mypage/hp",
  },
  {
    title: "비밀번호변경",
    avatar: <QuestionCircleOutlined />,
    url: "/mypage/pwd",
  },
  {
    title: "계정탈퇴",
    avatar: <QuestionCircleOutlined />,
    url: "/mypage/signout",
  },
];

const Dashboard = (props) => {
  const router = useRouter();
  const [user, setUserState] = useRecoilState(userState);
  const [userInfo, setUserInfo] = useState(null);
  const address = useRecoilValue(addressSelector);
  const [addressText, setAddressText] = useState("Location");

  useEffect(() => {
    if (user) {
      setUserInfo(user);
    } else {
      router.replace("/");
    }
  }, [user]);

  useEffect(() => {
    if (address?.delivery) {
      setAddressText(address?.delivery);
    }
  }, [address]);

  return (
    <div className="max-container">
      <AppLayout>
        <Row gutter={16} style={{ padding: 10 }}>
          <Col xs={24}>
            <Card title="프로필">
              <Meta
                avatar={<UserOutlined />}
                title={userInfo?.email}
                description={userInfo?.username}
              />
            </Card>
          </Col>
          <Col xs={24}>
            <List
              itemLayout="horizontal"
              dataSource={data}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={item.avatar}
                    title={<Link href={item.url}>{item.title}</Link>}
                  />
                  <div>
                    <RightOutlined />
                  </div>
                </List.Item>
              )}
            />
          </Col>
        </Row>
      </AppLayout>
    </div>
  );
};

Dashboard.propTypes = {};

export default Dashboard;
