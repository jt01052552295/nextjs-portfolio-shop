import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import AppLayout from "../../../components/AppLayout";
import MyOrderDetail from "../../../components/mypage/order/MyOrderDetail";

const OrderView = ({ id, order, fallback }) => {
  useEffect(() => {
    // console.log(id);
    // console.log(order);
  }, []);

  return (
    <AppLayout title="주문내역상세 | 개인쇼핑몰 v1.0" description="desc..">
      <MyOrderDetail order={order} />
    </AppLayout>
  );
};

OrderView.propTypes = { id: PropTypes.string.isRequired };

export const getServerSideProps = async ({ req, params }) => {
  const id = params.id;
  const url = `${process.env.NEXT_PUBLIC_API_URL}/order/read/${id}`;
  const data = await axios.get(url).then((res) => res.data);

  return {
    props: {
      id: id,
      order: data,
      fallback: {
        [url]: data,
      },
    },
  };
};

export default OrderView;
