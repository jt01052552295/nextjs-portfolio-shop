import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Radio, Row, Col, Space, Card, Skeleton } from "antd";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  locationState,
  LOCATION_ATOM_KEY,
  addressState,
  ADDRESS_ATOM_KEY,
} from "../../atoms";

const SearchAddressRow = ({ item }) => {
  const [loading, setLoading] = useState(true);
  const [, setLocationState] = useRecoilState(locationState);
  const [, setAddressState] = useRecoilState(addressState);

  useEffect(() => {
    if (item) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [item]);

  const setlocaladdr = (item) => {
    let address_name = item.road_address?.address_name
      ? item.road_address?.address_name
      : item.address?.address_name;

    let road_name = item.road_address?.road_name
      ? item.road_address?.road_name
      : "";

    let region_1depth_name = item.road_address?.region_1depth_name
      ? item.road_address?.region_1depth_name
      : item.address?.region_1depth_name;
    let region_2depth_name = item.road_address?.region_2depth_name
      ? item.road_address?.region_2depth_name
      : item.address?.region_2depth_name;
    let region_3depth_name = item.road_address?.region_3depth_name
      ? item.road_address?.region_3depth_name
      : item.address?.region_3depth_h_name;

    console.log("address", address_name);
    console.log("road_name", road_name);
    console.log("region_1depth_name", region_1depth_name);
    console.log("region_2depth_name", region_2depth_name);
    console.log("region_3depth_name", region_3depth_name);
    let obj = {};

    obj.address = address_name;
    obj.road_name = road_name;
    obj.region_1depth_name = region_1depth_name;
    obj.region_2depth_name = region_2depth_name;
    obj.region_3depth_name = region_3depth_name;

    Promise.allSettled([setAddressState(obj)])
      .then((results) => {
        setLocationState(true);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {});
  };

  return (
    <div>
      {loading ? (
        <Space>
          <Skeleton.Input active={true} />
          <Skeleton.Button active={true} />
        </Space>
      ) : (
        <Button type="text" onClick={(e) => setlocaladdr(item)}>
          {item.address_name}
        </Button>
      )}
    </div>
  );
};

SearchAddressRow.propTypes = { item: PropTypes.object.isRequired };

export default SearchAddressRow;
