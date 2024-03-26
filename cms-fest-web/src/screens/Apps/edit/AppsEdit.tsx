import React from "react";
import { MainTemplate } from "@/components/templates/MainTemplate/MainTemplate";

import styles from "./AppsEdit.module.css";
import { Input } from "@/components/atoms/Input/Input";
import { Button } from "@/components/atoms/Button/Button";
import { FiSave, FiTrash } from "react-icons/fi";
import { NavLink } from "react-router-dom";

export const AppsEdit: React.FC = () => {
  const [appName, setAppName] = React.useState("");
  const [email, setEmail] = React.useState("");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
  }

  return (
    <MainTemplate>
      <section className={styles["container"]}>
        <form className={styles["form"]} onSubmit={handleSubmit}>
          <h3>Edição de app</h3>
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

        <div className={styles["main-content"]}>
          <div className={styles["wrapper"]}>
            <h3>Configurações do APP</h3>
            <Button>
              <FiSave size={24} color="#F8F8FF" />
              Salvar
            </Button>
          </div>

          <p>Status da integração Offline</p>
          <p>Token Da integração</p>
          <NavLink to="/">Gerar token</NavLink>
          <hr />
          <h2>ÁREA DE RISCO</h2>
          <p>
            Só continue se você tiver total certeza do que está fazendo. Esta ação não pode ser revertida e poderá acarretar em problemas com
            aplicações terceiras.
          </p>

          <Button className={styles["button-remove"]}>
            <FiTrash size={24} color="#F8F8FF" />
            <p>Remover App</p>
          </Button>
        </div>
      </section>
    </MainTemplate>
  );
};
