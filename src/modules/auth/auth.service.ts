import {
  CreateUser,
  LoginUser,
  UserResponse,
  LoginResponse,
  RefreshToken,
} from "@/interfaces/user.interfaces";
import {
  validateSignUp,
  validateSignIn,
  validateRefreshToken,
} from "./auth.validator";
import repo from "./auth.repo";
import { hash, compareSync } from "bcryptjs";
import { CustomError, DataValidator } from "@/utils/custom-error";
import { generateJWT } from "@/middlewares/jwt.service";
import { DecodedToken } from "@/interfaces/context.interfaces";
import jwt from "jsonwebtoken";
import {
  JWT_ACCESS_TOKEN_SECRET,
  JWT_REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_EXPIRY,
} from "@/config";

export const registerService = async (
  userData: CreateUser
): Promise<{ user: UserResponse }> => {
  const { error } = validateSignUp(userData);
  if (error) {
    const dataError = DataValidator(error);
    throw new CustomError("request body is invalid", 400, dataError);
  }

  const findUser = await repo.findUserByEmail(userData.email);
  if (findUser) {
    throw new CustomError(`Email ${userData.email} already exists`, 409);
  }

  const hashedPassword = await hash(userData.password, 10);
  const newUserData = await repo.createUser({
    ...userData,
    password: hashedPassword,
  });

  const { password, ...userWithoutPassword } = newUserData; // eslint-disable-line @typescript-eslint/no-unused-vars
  console.log(userWithoutPassword);
  return { user: userWithoutPassword };
};

export const loginService = async (
  loginData: LoginUser
): Promise<LoginResponse> => {
  const { error } = validateSignIn(loginData);
  if (error) {
    const dataError = DataValidator(error);
    throw new CustomError("request body is invalid", 400, dataError);
  }

  const findUser = await repo.findUserByEmail(loginData.email);
  if (!findUser) {
    throw new CustomError("Email or password is invalid", 401);
  }

  const validPassword = compareSync(loginData.password, findUser.password);
  if (!validPassword) {
    throw new CustomError("Email or password is invalid", 401);
  }

  const payload: DecodedToken = {
    user_id: findUser.id,
    user_role: findUser.role,
  };

  const access = generateJWT(
    payload,
    JWT_ACCESS_TOKEN_SECRET as string,
    ACCESS_TOKEN_EXPIRY as unknown as number
  );

  const refresh = generateJWT(
    payload,
    JWT_REFRESH_TOKEN_SECRET as string,
    REFRESH_TOKEN_EXPIRY as unknown as number
  );

  return {
    token_access: access.token,
    token_access_expired: access.expires_in,
    token_refresh: refresh.token,
    token_refresh_expired: refresh.expires_in,
  };
};

export const refreshTokenService = async (
  body: RefreshToken
): Promise<LoginResponse> => {
  // Validasi request body
  const { error } = validateRefreshToken(body);
  if (error) {
    const dataError = DataValidator(error);
    throw new CustomError("Request body is invalid", 400, dataError);
  }

  const token = body.refresh_token;
  if (!token) {
    throw new CustomError("Refresh token is required", 400);
  }

  const decoded = jwt.verify(
    token,
    JWT_REFRESH_TOKEN_SECRET as string
  ) as DecodedToken | null;
  if (!decoded?.user_id) {
    throw new CustomError("Invalid or expired refresh token", 401);
  }
  const payload: DecodedToken = {
    user_id: decoded.user_id,
    user_role: decoded.user_role,
  };

  const access = generateJWT(
    payload,
    JWT_ACCESS_TOKEN_SECRET as string,
    Number(ACCESS_TOKEN_EXPIRY)
  );

  const refresh = generateJWT(
    payload,
    JWT_REFRESH_TOKEN_SECRET as string,
    Number(REFRESH_TOKEN_EXPIRY)
  );

  return {
    token_access: access.token,
    token_access_expired: access.expires_in,
    token_refresh: refresh.token,
    token_refresh_expired: refresh.expires_in,
  };
};
