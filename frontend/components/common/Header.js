import React, { useCallback, useState, useRef } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { Row, Col, Input, Select } from "antd";
const { Search } = Input;
const { Option } = Select;
import { SearchOutlined } from "@ant-design/icons";
import useInput from "../../hooks/useInput";

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

  const onSearch = useCallback(() => {
    // Router.push(`/hashtag/${searchInput}`);

    if (searchInput) {
      console.log("검색", searchSelect, searchInput);
    } else {
      alert("검색어를 입력하세요");
      selectRef.current.focus();
      return false;
    }
  }, [searchInput, searchSelect]);

  const handleChange = useCallback((value) => {
    onChangeSearchSelect(value);
  }, []);

  return (
    <header className="head">
      <Row
        gutter={16}
        align="middle"
        justify="start"
        style={{ height: 50, padding: 10 }}
      >
        <Col flex={2}>
          <Link href="/">Logo</Link>
        </Col>
        {/* <Col>
          <SearchOutlined />
        </Col> */}
        <Col>
          <Link href="/sign-in">Login</Link>
        </Col>
        <Col>
          <Link href="/sign-up">SignUp</Link>
        </Col>
        <Col>
          <Link href="/cart">Cart</Link>
        </Col>
        <Col>
          <Link href="/logout">Logout</Link>
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
