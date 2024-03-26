import { ReactElement } from "react";
import LogoImage from "/assets/images/logo-bigger.png";
import styles from "./Logo.module.css";

export const Logo = (): ReactElement => {
  return <img className={styles["container-logo"]} src={LogoImage} alt="logo-image" />;
};
