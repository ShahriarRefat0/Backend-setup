
import { Schema, model, Types } from "mongoose";

export interface IProduct {
  title: string;

  description: string;

  price: number;

  stock: number;

  image?: string;

  merchantId: Types.ObjectId;
}

const productSchema = new Schema<IProduct>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    stock: {
      type: Number,
      required: true,
      default: 0,
    },

    image: {
      type: String,
    },

    merchantId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Product = model<IProduct>(
  "Product",
  productSchema
);