import React, { useCallback, useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import Link from "next/link";
import {
  Row,
  Col,
  Input,
  Select,
  Badge,
  Space,
  Typography,
  Button,
  Drawer,
} from "antd";
const { Search } = Input;
const { Option } = Select;
const { Text } = Typography;
import {
  ShoppingCartOutlined,
  EnvironmentOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import Navigation from "./Navigation";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  userState,
  userSelector,
  USER_ATOM_KEY,
  addressSelector,
  searchState,
  SEARCH_ATOM_KEY,
  cartListStatsState,
} from "../../atoms";

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
  const [searchInput, onChangeSearchInput] = useState("");
  const [searchSelect, onChangeSearchSelect] = useState("전체");
  const selectRef = useRef(null);
  const router = useRouter();
  const [user, setUserState] = useRecoilState(userState);
  const [userInfo, setUserInfo] = useState(null);
  const user2 = useRecoilValue(userSelector);
  const address = useRecoilValue(addressSelector);
  const [search, setSearchState] = useRecoilState(searchState);
  const [addressText, setAddressText] = useState("Location");

  const { totalNum } = useRecoilValue(cartListStatsState);
  const [cartTotalNum, setCartTotalNum] = useState(0);

  useEffect(() => {
    setCartTotalNum(totalNum);
  }, [totalNum]);

  useEffect(() => {
    if (address?.address2) {
      setAddressText(address?.address2);
    }
  }, [address]);

  useEffect(() => {
    setUserInfo(user);
  }, [user]);

  useEffect(() => {
    authCheck(router.asPath);
    router.events.on("routeChangeStart", (url, { shallow }) => {
      // console.log(`routing to ${url}`, `is shallow routing: ${shallow}`);
    });

    router.events.on("routeChangeComplete", authCheck);

    return () => {
      router.events.off("routeChangeComplete", authCheck);
    };
  }, []);

  function authCheck(url) {
    const publicPaths = ["/member/login", "/member/sign-up"];
    const path = url.split("?")[0];

    if (user && publicPaths.includes(path)) {
      router.replace("/");
    }
  }

  const onSearch = (value) => {
    if (value) {
      setSearchState({ searchSelect: searchSelect, searchInput: searchInput });
    } else {
      setSearchState({ searchSelect: searchSelect, searchInput: "" });
    }
    // if (searchInput) {
    //   // console.log("검색", searchSelect, searchInput);
    //   setSearchState({ searchSelect: searchSelect, searchInput: searchInput });
    //   // router.push(`/search/${searchInput}`);
    // } else {
    //   alert("검색어를 입력하세요");
    //   selectRef.current.focus();
    //   return false;
    // }
  };

  const handleChange = useCallback((value) => {
    onChangeSearchSelect(value);
  }, []);

  const logout = (e) => {
    e.preventDefault();

    // Promise.allSettled([setUserState(null)])
    //   .then((results) => {
    //     localStorage.removeItem(USER_ATOM_KEY);
    //     router.replace("/");
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   })
    //   .finally(() => {});
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
        <Col>
          <Link href="/cart">
            <Badge count={cartTotalNum} size="small">
              <ShoppingCartOutlined
                style={{ fontSize: "18px", color: "#1890ff" }}
              />
            </Badge>
          </Link>
        </Col>
        <Col>
          <Link href="/location">
            <EnvironmentOutlined />
            <Text
              style={{ maxWidth: 80, color: "inherit" }}
              ellipsis={true}
            >{` ${addressText}`}</Text>
          </Link>
        </Col>
        <Col>
          <Navigation />
        </Col>
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
            onChange={(e) => onChangeSearchInput(e.target.value)}
            ref={selectRef}
          />
        </Col>
      </Row>
    </header>
  );
};

Header.propTypes = {};

export default Header;
