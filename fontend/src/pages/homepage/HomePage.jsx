import React from "react";
import HomeCart from "../../component/productcard/HomeCart";
import ProductSlider from "../../component/silder/ProductSlider";

const HomePage = () => {
  return (
    <div className="max-w-[1280px] mx-auto bg-zinc-100">
      <ProductSlider />
      <HomeCart />
    </div>
  );
};

export default HomePage;
