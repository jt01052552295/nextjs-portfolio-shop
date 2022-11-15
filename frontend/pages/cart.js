import React from "react";
import PropTypes from "prop-types";
import CartList from "../components/cart/CartList";
import AppLayout from "../components/AppLayout";

const Cart = (props) => {
  return (
    <div className="max-container">
      <AppLayout>
        <CartList />
      </AppLayout>
    </div>
  );
};

Cart.propTypes = {};

export default Cart;
