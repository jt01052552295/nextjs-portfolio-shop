import React, { useCallback, useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import Link from "next/link";
import { Row, Col, Input, Select, Badge, Space } from "antd";
const { Search } = Input;
const { Option } = Select;
import { ShoppingCartOutlined, EnvironmentOutlined } from "@ant-design/icons";
import useInput from "../../hooks/useInput";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState, userSelector, USER_ATOM_KEY } from "../../atoms";

const options = [];
options.push({
  label: "전체",
  value: "all",
});
options.push({
  label: "카테고리1",
  value: "category1",
});
options.push({
  label: "카테고리2",
  value: "category2",
});

const Header = () => {
  const [searchInput, onChangeSearchInput] = useInput("");
  const [searchSelect, onChangeSearchSelect] = useState("전체");
  const selectRef = useRef(null);
  const router = useRouter();
  const [user, setUserState] = useRecoilState(userState);
  const user2 = useRecoilValue(userSelector);

  useEffect(() => {
    // console.log(router.asPath);
    // console.log("header-user", user);

    router.events.on("routeChangeStart", (url, { shallow }) => {
      console.log(`routing to ${url}`, `is shallow routing: ${shallow}`);
    });

    router.events.on("routeChangeComplete", (url) => {
      const publicPaths = ["/member/login", "/member/sign-up"];
      const path = url.split("?")[0];

      console.log("user", user, publicPaths.includes(path));
      console.log("user2", user2, publicPaths.includes(path));

      // console.log(`completely routed to ${url}`, publicPaths.includes(path))
      if (user && publicPaths.includes(path)) {
        router.replace("/");
      }

      // if (!user && !publicPaths.includes(path)) {
      //   router.push({
      //     pathname: "/member/login",
      //     query: { returnUrl: router.asPath },
      //   });
      // }
    });
  }, []);

  const onSearch = useCallback(() => {
    if (searchInput) {
      console.log("검색", searchSelect, searchInput);
      router.push(`/search/${searchInput}`);
    } else {
      alert("검색어를 입력하세요");
      selectRef.current.focus();
      return false;
    }
  }, [searchInput, searchSelect]);

  const handleChange = useCallback((value) => {
    onChangeSearchSelect(value);
  }, []);

  const logout = (e) => {
    e.preventDefault();

    Promise.allSettled([setUserState(null)])
      .then((results) => {
        localStorage.removeItem(USER_ATOM_KEY);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {});
  };

  return (
    <header className="head">
      <Row
        gutter={16}
        align="middle"
        justify="start"
        style={{ height: 50, padding: 10 }}
      >
        <Col flex={2}>
          <Link href="/">Pza Mall</Link>
        </Col>
        {/* <Col>
          <SearchOutlined />
        </Col> */}

        {!user && (
          <Space>
            <Col>
              <Link href="/member/login">Login</Link>
            </Col>
            <Col>
              <Link href="/member/sign-up">Register</Link>
            </Col>
          </Space>
        )}
        <Col>
          <Link href="/cart">
            <Badge count={5} size="small">
              <ShoppingCartOutlined
                style={{ fontSize: "18px", color: "#1890ff" }}
              />
            </Badge>
          </Link>
        </Col>
        <Col>
          <Link href="/location">
            <EnvironmentOutlined /> Location
          </Link>
        </Col>
        {user && (
          <Col>
            <Link href="#" onClick={(e) => logout(e)}>
              Logout
            </Link>
          </Col>
        )}
      </Row>
      <Row
        gutter={16}
        style={{ paddingLeft: 10, paddingRight: 10, paddingBottom: 10 }}
      >
        <Col xs={24}>
          <Search
            enterButton
            addonBefore={
              <Select
                defaultValue={searchSelect}
                className="select-before"
                options={options}
                onChange={handleChange}
              />
            }
            placeholder="검색어를 입력하세요."
            allowClear
            onSearch={onSearch}
            value={searchInput}
            onChange={onChangeSearchInput}
            ref={selectRef}
          />
        </Col>
      </Row>
    </header>
  );
};

Header.propTypes = {};

export default Header;
