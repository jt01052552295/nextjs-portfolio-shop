import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import AppLayout from "../../../components/AppLayout";
import MyOrderList from "../../../components/mypage/order/MyOrderList";
import { useRouter } from "next/router";
import axios from "axios";

const List = ({ page, list, fallback }) => {
  return (
    <AppLayout title="주문내역 | 개인쇼핑몰 v1.0" description={"..."}>
      <MyOrderList page={page} list={list} />
    </AppLayout>
  );
};

List.propTypes = {};

export const getServerSideProps = async ({ query }) => {
  const page = query.page || 1;
  const url = `${process.env.NEXT_PUBLIC_API_URL}/order/list/${page}`;
  const data = await axios.get(url).then((response) => response.data);
  //   const data = null;

  return {
    props: {
      page,
      list: data,
      fallback: {
        [url]: data,
      },
    },
  };
};

export default List;
