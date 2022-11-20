import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Pagination } from "antd";

const SearchAddressPage = ({ ...param }) => {
  const [loading, setLoading] = useState(true);

  const {
    countPerPage,
    is_end,
    keyword,
    page,
    pageable_count,
    per_page,
    total_count,
    setPage,
  } = param;
  let mPageCount = Math.ceil(total_count / countPerPage);
  let mTotalBlock = Math.ceil(mPageCount / per_page);
  let mBlock = Math.ceil(page / per_page);
  let mFirstPerPage = (mBlock - 1) * per_page;
  let mLastPerPage = mTotalBlock <= mBlock ? mPageCount : mBlock * per_page;

  useEffect(() => {
    if (param) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [param]);

  const searchAddr = (page) => {
    setPage(page);
  };

  return (
    <div>
      {loading ? (
        <div>불러오는 중...</div>
      ) : (
        <Pagination
          current={page}
          total={total_count}
          onChange={searchAddr}
          showTotal={(total) => `Total ${total} items`}
          size="small"
          style={{ marginTop: "10px" }}
        />
      )}
    </div>
  );
};

SearchAddressPage.propTypes = {};

export default SearchAddressPage;
