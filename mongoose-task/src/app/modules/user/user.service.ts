import { User } from "./user.model";

const getAllUsers = async () => {
  const users = await User.find();

  return users;
};

const getSingleUser = async (id: string) => {
  const user = await User.findById(id);

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

const deleteUser = async (id: string) => {
  const user = await User.findById(id);

  if (!user) {
    throw new Error("User not found");
  }

  await User.findByIdAndDelete(id);

  return null;
};

export const UserService = {
  getAllUsers,
  getSingleUser,
  deleteUser,
};