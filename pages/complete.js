import React from "react";
import PropTypes from "prop-types";
import CompleteList from "../components/order/CompleteList";
import AppLayout from "../components/AppLayout";

const Complete = ({ uid }) => {
  return (
    <AppLayout title="주문완료 | 개인쇼핑몰 v1.0" description="desc..">
      <CompleteList uid={uid} />
    </AppLayout>
  );
};

Complete.propTypes = { id: PropTypes.any };

export default Complete;

export const getServerSideProps = async ({ req, query }) => {
  const uid = query?.uid;

  // console.log(params);

  return {
    props: {
      uid: uid,
    },
  };
};
