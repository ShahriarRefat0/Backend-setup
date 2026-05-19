import bcrypt from "bcrypt";
import { prisma } from "../../../lib/prisma";
import type { UserLogin, UserRegister } from "./auth.validation";
import { sendEmail } from "../../utils/sendEmail";
import jwt from "jsonwebtoken";
import env from "../../../config/env";

// register user

const registerUser = async (payload: UserRegister) => {
  const hashPassword = await bcrypt.hash(
    payload.password,
    env.bcrypt_salt_rounds,
  );
  const token =  crypto.randomUUID();

  const user = await prisma.user.create({
    data: {
      name: payload.name,
      email: payload.email,
      password: hashPassword,
      role: payload.role,
    },
  });

  await prisma.verificationToken.create({
    data: {
      verifyToken: token,
      userId: user.id,
    },
  });

  await sendEmail(
    user.email,
    "Verify Your Email",
    `
    <h1>Email Verification</h1>

    <a href="http://localhost:5000/api/v1/auth/confirm-email?token=${token}">
      Verify Email
    </a>
  `,
  );
  const { password, ...safeUser } = user;
  return safeUser;
};

//logiin user

const loginUser = async (payload: UserLogin) => {
  const user = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });
  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordValid = await bcrypt.compare(payload.password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }
  const { password, ...safeUser } = user;

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    env.jwt_secret,
    {
      expiresIn: "7d",
    },
  );

  return {
    token,
    user: safeUser,
  };
};

//confrim email

const confirmEmail = async (token: string) => {
  const verification = await prisma.verificationToken.findFirst({
    where: {
      verifyToken: token,
    },
    select: {
      userId: true,
    },
  });
  if (!verification) {
    throw new Error("Invalid verification token");
  }

  const updatedUser = await prisma.user.update({
    where: {
      id: verification.userId,
    },
    data: {
      isVerified: true,
    },
  });

  const { password, ...safeUser } = updatedUser;

  return safeUser;
};

export const AuthService = {
  registerUser,
  loginUser,
  confirmEmail,
};
