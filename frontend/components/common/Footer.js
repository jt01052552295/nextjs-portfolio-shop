import React from "react";
import PropTypes from "prop-types";
import { ArrowUpOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";

const Footer = () => {
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

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
