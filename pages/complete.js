import React from "react";
import PropTypes from "prop-types";
import CompleteList from "../components/order/CompleteList";
import AppLayout from "../components/AppLayout";

const Complete = ({ uid }) => {
  return (
    <div className="max-container">
      <AppLayout>
        <CompleteList uid={uid} />
      </AppLayout>
    </div>
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
