import React from "react";
import { FaSpinner } from "react-icons/fa";
import { SpinnerIconPropsType } from "../../../types/common";
import "./SpinnerIcon.css";

const SpinnerIcon: React.FC<SpinnerIconPropsType> = ({
  ariaLabel,
  iconType,
  role = "status",
}) => {
  return (
    <FaSpinner
      aria-label={ariaLabel}
      className={`spinner ${iconType ? iconType : ""}`}
      role={role}
    />
  );
};

export default SpinnerIcon;
