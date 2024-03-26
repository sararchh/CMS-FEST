import React from "react";

import styles from './NotFound.module.css'

export const NotFound: React.FC = () => {
  return (
    <section className={styles["container"]}>
      <h1>Error 404: Não encontrado</h1>
    </section>
  );
};
