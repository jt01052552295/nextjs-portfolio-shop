import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import SingleLayout from "../components/SingleLayout";
import LoadingView from "../components/config/Loading";

const Loading = (props) => {
  return (
    <div>
      <LoadingView />
    </div>
  );
};

Loading.propTypes = {};

export default Loading;
