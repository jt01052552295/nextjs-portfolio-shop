import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import axios from "axios";
import ItemSkeleton from "./ItemSkeleton";
import Item from "./Item";
import { Button, Radio, Row, Col, Typography, Space } from "antd";
const { Paragraph, Text } = Typography;
import { useQuery, useMutation } from "@tanstack/react-query";
import { useRecoilState, useRecoilValue } from "recoil";
import { searchState, SEARCH_ATOM_KEY } from "../../atoms";
import { useItems } from "../../query/item";

const Items = (props) => {
  const [size, setSize] = useState("idx");
  const [items, setItems] = useState([]);
  const search = useRecoilValue(searchState);

  const { isLoading: isLoading, refetch: getLists, data: data } = useItems();

  useEffect(() => {
    // if (isLoading) console.log("loading...");
  }, [isLoading]);

  useEffect(() => {
    if (search) {
      console.log("variable", search.searchInput);
      let arr = [...data.data.items];
      let afterSearch = arr.filter(
        (x) => x.name.indexOf(search.searchInput) > -1
      );
      setItems(afterSearch);
    } else {
      setItems(data?.data.items);
    }
  }, [data]);

  useEffect(() => {
    getAllData();
  }, [search]);

  const getAllData = () => {
    try {
      getLists();
    } catch (err) {
      console.error(err.response?.data || err);
    }
  };

  useEffect(() => {
    let arr = [...items];
    if (size === "sale") {
      setItems(arr.sort((a, b) => b.sale - a.sale));
    } else if (size === "price1") {
      setItems(arr.sort((a, b) => b.price - a.price));
    } else if (size === "price2") {
      setItems(arr.sort((a, b) => a.price - b.price));
    } else if (size === "idx") {
      setItems(arr.sort((a, b) => b.idx - a.idx));
    }
  }, [size]);

  return (
    <div className="items">
      <Row justify="end">
        <Col
          span={13}
          style={{ textAlign: "right", paddingBottom: 10, paddingRight: 10 }}
        >
          <Radio.Group value={size} onChange={(e) => setSize(e.target.value)}>
            <Radio.Button value="sale">판매량순</Radio.Button>
            <Radio.Button value="price1">높은가격순</Radio.Button>
            <Radio.Button value="price2">낮은가격순</Radio.Button>
            <Radio.Button value="idx">최신순</Radio.Button>
          </Radio.Group>
        </Col>
      </Row>

      <div className="site-card-wrapper">
        <Row gutter={16}>
          {isLoading &&
            Array.from(Array(12)).map((i) => {
              let ran = Math.random();
              return <ItemSkeleton key={`key-${ran}`} />;
            })}
          {items.length > 0 &&
            items.map((item) => {
              return <Item key={`key-${item.idx}`} item={item} />;
            })}
          {items.length === 0 && (
            <Space style={{ background: "#fff", padding: 10 }}>
              <Paragraph>
                <Text
                  strong
                  style={{
                    fontSize: 16,
                  }}
                >
                  검색결과가 없습니다.
                </Text>
              </Paragraph>
              <Paragraph>다른 상품명으로 검색해주세요.</Paragraph>
            </Space>
          )}
        </Row>
      </div>
    </div>
  );
};

Items.propTypes = {};

export default Items;
