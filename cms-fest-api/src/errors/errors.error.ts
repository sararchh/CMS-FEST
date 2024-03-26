import { ApplicationError } from "@/protocols";

export function registerAlreadyExistsError(): ApplicationError {
  return {
    name: "registerAlreadyExistsError",
    message: "there is a register with this email.",
  };
}

export function registerIdPositionAlreadyExistsError(): ApplicationError {
  return {
    name: "registerAlreadyExistsError",
    message: "there is a register with this id_position.",
  };
}

export function registerNotExistsError(): ApplicationError {
  return {
    name: "registerNotExistsError",
    message: "register not exists the plataform.",
  };
}

export function UnableToCreateRegister(): ApplicationError {
  return {
    name: "UnableToCreateRegister",
    message: "Unable to create register the plataform.",
  };
}

export function UnableToUpdateRegister(): ApplicationError {
  return {
    name: "UnableToUpdateRegister",
    message: "Unable to update register the plataform.",
  };
}