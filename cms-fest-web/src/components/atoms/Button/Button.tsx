import React, { ReactElement } from "react";

import styles from "./Button.module.css";

interface AuxProps {
  children?: React.ReactNode;
  submit?: boolean;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}

export const Button = ({ children, submit = false, disabled, className, onClick = () => null }: AuxProps): ReactElement => {
  return (
    <button
      className={className ? `${styles["button"]} ${className}` : styles["button"]}
      disabled={disabled ? true : false}
      type={submit ? "submit" : "button"}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
