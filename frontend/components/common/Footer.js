import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { ArrowUpOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import { atom, selector, useRecoilState, useRecoilValue } from "recoil";
import { userState } from "../../atoms";

const Footer = () => {
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const user = useRecoilValue(userState);

  useEffect(() => {
    console.log("footer", user);
  });

  return (
    <footer className="footer">
      <a
        href="https://github.com/jt01052552295/nextjs-portfolio-shop"
        target="_blank"
        rel="noreferrer nopoener"
      >
        &copy; 2022 jtm
      </a>

      <div className="top-to-btm">
        <Button
          type="primary"
          shape="circle"
          icon={<ArrowUpOutlined />}
          onClick={goToTop}
        />
      </div>
    </footer>
  );
};

Footer.propTypes = {};

export default Footer;
