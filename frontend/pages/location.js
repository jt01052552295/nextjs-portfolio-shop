import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import AppLayout from "../components/AppLayout";
import {
  Row,
  Col,
  Card,
  Button,
  Space,
  Input,
  InputNumber,
  Divider,
  Checkbox,
} from "antd";
const { Search } = Input;
import { useMutation } from "@tanstack/react-query";
import SearchAddress from "../components/address/SearchAddress";
import SearchAddressPage from "../components/address/SearchAddressPage";

import { useRecoilState, useRecoilValue } from "recoil";
import { locationState, LOCATION_ATOM_KEY } from "../atoms";
import DetailAddress from "../components/address/DetailAddress";

const Location = (props) => {
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [addresses, setAddress] = useState(null);

  const [is_end, setIsEnd] = useState(false);
  const [pageable_count, setPageableCount] = useState(0);
  const [total_count, setTotalCount] = useState(0);
  const [per_page, setPerPage] = useState(5);
  const [countPerPage, setCountPerPage] = useState(10);

  const [showDetail, setLocationState] = useRecoilState(locationState);

  const searchMutation = useMutation(
    async (variable) => {
      const { searchKeyword, searchPage } = variable;
      return await axios.get(
        `/api/map/search?keyword=${encodeURIComponent(
          searchKeyword
        )}&page=${searchPage}`
      );
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
        let res = data?.data;
        setAddress(res);
        setIsEnd(res.is_end);
        setPageableCount(res.pageable_count);
        setTotalCount(res.total_count);
      },
      onSettled: () => {
        console.log("end");
      },
    }
  );

  const search = (value, page) => {
    const credentials = { searchKeyword: value, searchPage: page };
    searchMutation.mutate(credentials);
  };

  const setKeywordState = (value) => {
    setLocationState(false);
    setKeyword(value);
    search(value, page);
  };

  useEffect(() => {
    if (keyword !== "") {
      search(keyword, page);
    }
  }, [page]);

  return (
    <div className="max-container">
      <AppLayout>
        <Row
          gutter={16}
          style={{
            padding: 10,
            height: "100vh",
            display: "block",
          }}
        >
          <Col xs={24}>
            <Divider>주소설정</Divider>
            <Search
              placeholder="건물명,도로명 또는 지번으로 검색"
              onSearch={setKeywordState}
              enterButton
              loading={false}
            />
          </Col>

          {!showDetail && total_count > 0 && (
            <Col xs={24}>
              <SearchAddress addresses={addresses} />
              <SearchAddressPage
                is_end={is_end}
                pageable_count={pageable_count}
                total_count={total_count}
                per_page={per_page}
                page={page}
                countPerPage={countPerPage}
                keyword={keyword}
                setPage={setPage}
              />
            </Col>
          )}

          {showDetail && (
            <Col xs={24}>
              <DetailAddress />
            </Col>
          )}
        </Row>
      </AppLayout>
    </div>
  );
};

Location.propTypes = {};

export default Location;
