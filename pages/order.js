import React from "react";
import PropTypes from "prop-types";
import OrderList from "../components/order/OrderList";
import AppLayout from "../components/AppLayout";

const Order = (props) => {
  return (
    <AppLayout title="주문하기 | 개인쇼핑몰 v1.0" description="desc..">
      <OrderList />
    </AppLayout>
  );
};

Order.propTypes = {};

export default Order;
