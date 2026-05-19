import { Schema, model } from "mongoose";

export enum Role {
  ADMIN = "ADMIN",
  MERCHANT = "MERCHANT",
  CUSTOMER = "CUSTOMER",
}

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: Role;
  isVerified: boolean;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.CUSTOMER,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const User = model<IUser>("User", userSchema);