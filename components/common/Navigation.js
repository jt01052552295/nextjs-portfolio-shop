import React, { useCallback, useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import Link from "next/link";
import {
  Row,
  Col,
  Avatar,
  Divider,
  Badge,
  Space,
  Typography,
  Button,
  Drawer,
  Card,
} from "antd";
const { Meta } = Card;
import { MenuOutlined, UserOutlined } from "@ant-design/icons";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState, userSelector, USER_ATOM_KEY } from "../../atoms";

const Navigation = (props) => {
  const router = useRouter();
  const [user, setUserState] = useRecoilState(userState);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    setUserInfo(user);
  }, [user]);

  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const logout = (e) => {
    e.preventDefault();

    Promise.allSettled([setUserState(null)])
      .then((results) => {
        localStorage.removeItem(USER_ATOM_KEY);
        router.replace("/");
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {});
  };

  return (
    <Space>
      <Button type="default" onClick={showDrawer}>
        <MenuOutlined />
      </Button>
      <Drawer
        title="Pza Mall"
        placement="right"
        onClose={onClose}
        open={open}
        extra={
          <Space>
            {!userInfo && (
              <Space>
                <Button
                  onClick={(e) => {
                    router.push("/member/login");
                  }}
                >
                  로그인
                </Button>
                <Button
                  type="primary"
                  onClick={(e) => {
                    router.push("/member/sign-up");
                  }}
                >
                  가입
                </Button>
              </Space>
            )}
            {userInfo && (
              <Space>
                <Button
                  type="primary"
                  onClick={(e) => {
                    router.push("/mypage/dashboard");
                  }}
                >
                  MyPage
                </Button>
                <Button onClick={logout}>Logout</Button>
              </Space>
            )}
          </Space>
        }
      >
        <Row gutter={[16, 16]}>
          <Col xs={24}>
            <Avatar size={64} icon={<UserOutlined />} />
          </Col>
          <Col xs={24}>
            <Meta title={userInfo?.username} description={userInfo?.email} />
          </Col>
        </Row>
        <Divider />
        <Row gutter={[16]}>
          <Col xs={24}>네비게이션</Col>
          <Col xs={24}>준비중...</Col>
        </Row>
        <Divider />
        <Row gutter={[16, 8]}>
          <Col xs={12}>
            <Button
              type="default"
              block
              onClick={(e) => {
                alert("준비중..");
              }}
            >
              개인정보보호방침
            </Button>
          </Col>
          <Col xs={12}>
            <Button
              type="default"
              block
              onClick={(e) => {
                alert("준비중..");
              }}
            >
              이용가이드
            </Button>
          </Col>
          <Col xs={12}>
            <Button
              type="default"
              block
              onClick={(e) => {
                alert("준비중..");
              }}
            >
              이메일무단수집거부
            </Button>
          </Col>
          <Col xs={12}>
            <Button
              type="primary"
              block
              onClick={(e) => {
                alert("준비중..");
              }}
            >
              고객센터
            </Button>
          </Col>
        </Row>
      </Drawer>
    </Space>
  );
};

Navigation.propTypes = {};

export default Navigation;
