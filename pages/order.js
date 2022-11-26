import React from "react";
import PropTypes from "prop-types";
import OrderList from "../components/order/OrderList";
import AppLayout from "../components/AppLayout";

const Order = (props) => {
  return (
    <div className="max-container">
      <AppLayout>
        <OrderList />
      </AppLayout>
    </div>
  );
};

Order.propTypes = {};

export default Order;
