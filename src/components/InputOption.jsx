import React from "react";
import "./InputOption.css";

const InputOption = ({ Icon, title, color }) => {
  return (
    <div className="input-option">
      <Icon style={{ color: color, backgroundColor: "transparent" }} />
      <h6>{title}</h6>
    </div>
  );
};

export default InputOption;
