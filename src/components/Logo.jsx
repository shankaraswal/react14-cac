import React from "react";
import LogoImg from "../assets/images/logo.png";
function Logo({ width = "100px" }) {
  return (
    <div>
      <img src={LogoImg} alt="Barter and Porter" width={width} />
    </div>
  );
}

export default Logo;
