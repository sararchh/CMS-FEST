import { ApplicationError } from "../protocols";

export function NotFoundUserRequestError(): ApplicationError {
  return {
    name: "NotFoundUserRequestError",
    message: "not found user to this id, check and try again.",
  };
}

export function invalidCredentialsError(): ApplicationError {
  return {
    name: "InvalidCredentialsError",
    message: "email or password are incorrect.",
  };
}

export function registerIsNotActiveError(): ApplicationError {
  return {
    name: "registerIsNotActiveError",
    message: "user is not active to access the plataform.",
  };
}

export function invalidRefreshTokenError(): ApplicationError {
  return {
    name: "invalidRefreshTokenError",
    message: "refresh token is incorrect or invalid to regenerate session.",
  };
}


export function singOutSuccessMessage(): ApplicationError {
  return {
    name: "singOutSuccessMessage",
    message: "sign out success session destroyed.",
  };
}

export function createUserRequestError(): ApplicationError {
  return {
    name: "createUserRequestError",
    message: "failed on create user, check and try again.",
  };
}

export function listUserRequestError(): ApplicationError {
  return {
    name: "listUserRequestError",
    message: "failed list users, check and try again.",
  };
}

export function uploadUserError(): ApplicationError {
  return {
    name: "uploadUserError",
    message: "failed to upload user, check and try again.",
  };
}

export function deleteUserError(): ApplicationError {
  return {
    name: "deleteUserError",
    message: "failed to delete user, check and try again.",
  };
}