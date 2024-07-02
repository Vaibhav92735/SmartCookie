import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const CustomPrevArrow = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="absolute top-1/2 transform -translate-y-1/2 left-4 z-10 text-4xl text-white cursor-pointer"
      style={{ left: "10px" }} 
    >
      <FaArrowLeft />
    </div>
  );
};

const CustomNextArrow = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="absolute top-1/2 transform -translate-y-1/2 right-4 z-10 text-4xl text-white cursor-pointer"
      style={{ right: "60px" }} 
    >
      <FaArrowRight />
    </div>
  );
};

export { CustomPrevArrow, CustomNextArrow };
