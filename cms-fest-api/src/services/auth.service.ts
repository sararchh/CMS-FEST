import bcrypt from "bcrypt";
import {
  createUserRequestError,
  invalidCredentialsError,
  invalidRefreshTokenError,
  registerAlreadyExistsError,
  registerIsNotActiveError,
  uploadUserError,
  NotFoundUserRequestError,
} from "errors";

import { generateRefreshToken, generateToken, jwtVerify, excludeField } from "utils";

import authRepository from "@/repositories/auth.repository";

import { ICadUser } from "ts";
import { environment } from "config/environment.config";

export type SignInParams = Pick<ICadUser, "email" | "password">;
export type GetUserOrFailResult = Pick<
  ICadUser,
  "_id" | "email" | "password_hash" | "status"
>;

export type SignInResult = {
  user: Pick<ICadUser, "_id" | "email">;
  token: string;
  refreshToken?: string;
};

export async function signIn(params: SignInParams): Promise<SignInResult> {
  const { email, password } = params;

  let user = await getUserOrFail(email);
  if (user?.status === 0) throw registerIsNotActiveError();

  await validatePasswordOrFail(password, user.password_hash);

  const token = await createSession(user._id);
  const refreshToken = generateRefreshToken(user);
  	
  delete user.password_hash;

  return {
    user,
    token,
    refreshToken,
  };
}

export async function signUp(dataValues: ICadUser): Promise<SignInResult> {
  const userExists = await authRepository.findByEmail(dataValues?.email);
  if (userExists) throw registerAlreadyExistsError();

  const saltRounds = environment.BCRYPT_SALTS;
  const hashedPassword = await bcrypt.hash(dataValues.password, saltRounds);
  dataValues.password_hash = hashedPassword;
  
  delete dataValues.password
  let user = await authRepository.create(dataValues);

  if (!user) throw createUserRequestError();

  user = excludeField(user, "password_hash");
  user = excludeField(user, "password");

  const token = await createSession(user._id);
  const refreshToken = generateRefreshToken(user);

  return {
    user: user,
    token,
    refreshToken,
  };
}

export async function refreshToken(refresh: string): Promise<string> {
  const decoded: any = jwtVerify(refresh);

  if (!decoded) throw invalidRefreshTokenError();

  return generateToken({ userId: decoded.id });
}

export async function getUserOrFail(
  email: string
): Promise<GetUserOrFailResult> {
  const user = await authRepository.findByEmail(email);
  if (!user) throw invalidCredentialsError();

  return user;
}

export async function validatePasswordOrFail(
  password: string,
  userPassword: string
) {
  const isPasswordValid = await bcrypt.compare(password, userPassword);
  if (!isPasswordValid) throw invalidCredentialsError();
}

export async function createSession(userId: string) {
  return generateToken({ userId });
}

export async function findByIdUser(
  id: string
): Promise<GetUserOrFailResult | any> {
  const user: any = await authRepository.findById(id);
  if (!user && !Boolean(user.length)) throw NotFoundUserRequestError();
  return user;
}

export async function updateOneUser(
  id: string,
  dataValues: ICadUser | any
): Promise<Boolean> {
  let userUpdated: any = await authRepository.update(id, dataValues);
  if (!Boolean(userUpdated.length)) throw uploadUserError();

  return true;
}
