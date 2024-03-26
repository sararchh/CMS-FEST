import React from "react";

import styles from "./MainTemplate.module.css";
import { AsideNav } from "@/components/molecules/AsideNav/AsideNav";
import { Header } from "@/components/molecules/Header/Header";

interface Props {
  children: React.ReactNode;
}

export const MainTemplate: React.FC<Props> = ({ children }) => {
  return (
    <div className={styles["layout-container"]}>
      <AsideNav />
      <Header />
      <main className={styles["main-container"]}>{children}</main>
    </div>
  );
};
