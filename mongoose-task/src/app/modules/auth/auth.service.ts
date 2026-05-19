
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

import { User } from "../user/user.model";
import { VerificationToken } from "./verificationToken.model";

import type { LoginUser, RegisterUser } from "./auth.validation";
import env from "../../../config/env";

const registerUser = async (payload: RegisterUser) => {
  // check existing user
  const isUserExist = await User.findOne({
    email: payload.email,
  });

  if (isUserExist) {
    throw new Error("User already exists");
  }

  // hash password
  const hashedPassword = await bcrypt.hash(
    payload.password,
    Number(env.bcrypt_salt_rounds),
  );

  // create verify token
  const token = crypto.randomUUID();

  // create user
  const user = await User.create({
    name: payload.name,
    email: payload.email,
    password: hashedPassword,
    role: payload.role as any,
  });

  // save token
  await VerificationToken.create({
    verifyToken: token,
    userId: user._id.toString(),
  });

  // safe user
  const safeUser = user.toObject() as any;

  delete safeUser.password;

  return safeUser;
};

const loginUser = async (payload: LoginUser) => {
  // find user
  const user = await User.findOne({
    email: payload.email,
  }).select("+password");

  if (!user) {
    throw new Error("User not found");
  }

  // password compare
  const isPasswordMatched = await bcrypt.compare(
    payload.password,
    user.password,
  );

  if (!isPasswordMatched) {
    throw new Error("Invalid password");
  }

  // create token
  const accessToken = jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    env.jwt_secret as string,
    {
      expiresIn: "7d",
    },
  );

  // safe user
  const safeUser = user.toObject() as any;

  delete safeUser.password;

  return {
    accessToken,
    user: safeUser,
  };
};

const confirmEmail = async (token: string) => {
  // find token
  const verification = await VerificationToken.findOne({
    verifyToken: token,
  });

  if (!verification) {
    throw new Error("Invalid token");
  }

  // update user
  const updatedUser = await User.findByIdAndUpdate(
    verification.userId,
    {
      isVerified: true,
    },
    {
      new: true,
    },
  );

  return updatedUser;
};

export const AuthService = {
  registerUser,
  loginUser,
  confirmEmail,
};
