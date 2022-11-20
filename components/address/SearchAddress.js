import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import SearchAddressRow from "./SearchAddressRow";
import { Divider, List, Typography } from "antd";

const SearchAddress = ({ addresses }) => {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);

  useEffect(() => {
    if (addresses) {
      const newList = [];

      if (addresses.body?.length > 0) {
        addresses.body.forEach((row) => {
          newList.push(row);
        });
        setList(newList);
        setLoading(false);
      }
    }
  }, [addresses]);

  return (
    <div>
      {loading ? (
        <div></div>
      ) : (
        <div>
          <Divider orientation="left">검색결과</Divider>
          <List
            header={<div>주소선택</div>}
            bordered
            dataSource={list}
            renderItem={(item) => (
              <List.Item>
                <SearchAddressRow key={item.address_name} item={item} />
              </List.Item>
            )}
          />
        </div>
      )}
    </div>
  );
};

SearchAddress.propTypes = {};

export default SearchAddress;
