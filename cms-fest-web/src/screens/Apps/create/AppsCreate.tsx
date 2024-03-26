import React from "react";
import { MainTemplate } from "@/components/templates/MainTemplate/MainTemplate";

import styles from "./AppsCreate.module.css";
import { Input } from "@/components/atoms/Input/Input";
import { Button } from "@/components/atoms/Button/Button";
import { FiSave } from "react-icons/fi";

export const AppsCreate: React.FC = () => {
  const [appName, setAppName] = React.useState("");
  const [email, setEmail] = React.useState("");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
  }

  return (
    <MainTemplate>
      <section className={styles["container"]}>
        <form className={styles["form"]} onSubmit={handleSubmit}>
          <h3>Cadastro de app</h3>
          <div className={styles["wrapper-inputs"]}>
            <Input
              type="text"
              value={appName}
              onChange={({ target }) => setAppName(target.value)}
              placeholder="Digite o nome do app"
              label="Nome do app"
            />

            <Input
              type="email"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              placeholder="Digite o email"
              label="Email para contato"
            />

            <Input
              type="text"
              value={appName}
              onChange={({ target }) => setAppName(target.value)}
              placeholder="Digite o nome do app"
              label="Nome do app"
            />
          </div>

          <Button submit>
            <FiSave size={24} color="#F8F8FF" />
            Salvar
          </Button>
        </form>
      </section>
    </MainTemplate>
  );
};
