import { Schema, model } from "mongoose";

interface IVerificationToken {
  verifyToken: string;
  userId: string;
}

const verificationTokenSchema = new Schema<IVerificationToken>(
  {
    verifyToken: {
      type: String,
      required: true,
    },

    userId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const VerificationToken = model<IVerificationToken>(
  "VerificationToken",
  verificationTokenSchema
);