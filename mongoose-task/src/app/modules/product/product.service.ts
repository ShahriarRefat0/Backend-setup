
import { Product } from "./product.model";

const createProduct = async (
  payload: any,
  merchantId: string
) => {
  const product = await Product.create({
    ...payload,
    merchantId,
  });

  return product;
};

const getAllProducts = async () => {
  const products = await Product.find().populate(
    "merchantId"
  );

  return products;
};

const getSingleProduct = async (
  id: string
) => {
  const product = await Product.findById(id);

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
};

const updateProduct = async (
  id: string,
  payload: any,
  merchantId: string
) => {
  const product = await Product.findById(id);

  if (!product) {
    throw new Error("Product not found");
  }

  // only owner merchant update
  if (
    product.merchantId.toString() !==
    merchantId
  ) {
    throw new Error("Unauthorized");
  }

  const updatedProduct =
    await Product.findByIdAndUpdate(
      id,
      payload,
      {
        new: true,
      }
    );

  return updatedProduct;
};

const deleteProduct = async (
  id: string,
  merchantId: string
) => {
  const product = await Product.findById(id);

  if (!product) {
    throw new Error("Product not found");
  }

  // only owner merchant delete
  if (
    product.merchantId.toString() !==
    merchantId
  ) {
    throw new Error("Unauthorized");
  }

  await Product.findByIdAndDelete(id);

  return null;
};

export const ProductService = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};