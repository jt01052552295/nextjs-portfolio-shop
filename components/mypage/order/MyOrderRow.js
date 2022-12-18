import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useItems } from "../../../query/item";

const MyOrderRow = ({ rowkey, order }) => {
  console.log(order);
  const [items, setItems] = useState([]);
  const { isLoading: isLoading, status: status, data: data } = useItems();
  useEffect(() => {
    if (status === "success") {
      setItems(data?.data.items);
    }
  }, [status]);

  return <div>Row</div>;
};

MyOrderRow.propTypes = {};

export default MyOrderRow;
