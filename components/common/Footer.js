import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { ArrowUpOutlined } from "@ant-design/icons";
import { Button, Tooltip, Divider, Tag } from "antd";

const Footer = () => {
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="footer">
      <div>
        <Tag color="default">React.js</Tag>
        <Tag color="default">Next.js</Tag>
        <Tag color="default">React-Query</Tag>
        <Tag color="default">Recoil</Tag>
        <Tag color="default">Antd</Tag>
      </div>

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
