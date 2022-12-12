import React from "react";
import PropTypes from "prop-types";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const images = [
  {
    id: 1,
    src: "/images/main2.jpg",
    alt: "main2",
  },
  {
    id: 2,
    src: "/images/main3.jpg",
    alt: "main3",
  },
];
const Slick = (props) => {
  const settings = {
    dots: true,
    arrows: false,
    fade: true,
    lazyLoad: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    autoplay: true,
    autoplaySpeed: 3000,
    afterChange: function (index) {
      // console.log(`Slider Changed to: ${index + 1}`);
    },
  };
  return (
    <Slider {...settings}>
      {images.map((item) => (
        <div key={item.id}>
          <img src={item.src} alt={item.alt} />
        </div>
      ))}
    </Slider>
  );
};

Slick.propTypes = {};

export default Slick;
