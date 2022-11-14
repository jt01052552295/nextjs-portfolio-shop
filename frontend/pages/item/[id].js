import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ItemDetail from "../../components/items/ItemDetail";
import AppLayout from "../../components/AppLayout";
import { useRouter } from "next/router";
import axios from "axios";

const itemsJson = "/mock/items.json";
const ViewItem = ({ id, message }) => {
  const router = useRouter();
  const [item, setItem] = useState({});
  useEffect(() => {
    axios(itemsJson).then((res) => {
      setItem(res.data.items.find((x) => x.idx === parseInt(id)));
    });
  }, []);

  return (
    <div className="max-container">
      <AppLayout>
        <ItemDetail item={item} />
      </AppLayout>
    </div>
  );
};

ViewItem.propTypes = { id: PropTypes.string.isRequired };

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
