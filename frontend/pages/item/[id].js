import React from "react";
import PropTypes from "prop-types";
import ItemDetail from "../../components/items/ItemDetail";

const ViewItem = ({ id }) => {
  return (
    <div>
      <ItemDetail />
    </div>
  );
};

ViewItem.propTypes = {};

export const getServerSideProps = async ({ req, params }) => {
  const id = params.id;
  // const url = `${process.env.NEXT_PUBLIC_API_URL}/posts/read/${id}`;
  // const item = await fetchWrapper.get(url);

  return {
    props: {
      id: id,
    },
  };
};

export default ViewItem;
