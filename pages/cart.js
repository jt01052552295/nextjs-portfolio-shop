import React from "react";
import PropTypes from "prop-types";
import CartList from "../components/cart/CartList";
import AppLayout from "../components/AppLayout";

const Cart = (props) => {
  return (
    <AppLayout title="장바구니 | 개인쇼핑몰 v1.0" description="desc..">
      <CartList />
    </AppLayout>
  );
};

Cart.propTypes = {};

export default Cart;
