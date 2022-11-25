import moment from "moment";
import { userModel } from "../../../../Config/Database Configs/Auth/Schema/Users.js";

// Returns all users in the database in an array of user objects.
export const getUsers = async (req, res) => {
  const users = await userModel.find();
  if (!users) return res.status(204).json({ message: "No users found" });
  res.json(users);
};
// Accepts a JSON object and creates new user object in database with it.
export const createUser = async (req, res) => {};
// Returns single user from the database using a provided ID.
export const getUser = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "User ID required" });
  const user = await userModel.findOne({ _id: req.params.id }).exec();
  if (!user) {
    return res
      .status(204)
      .json({ message: `User ID ${req.params.id} not found` });
  }
  res.json(user);
};
// Deletes single user from the database using a provided ID.
export const deleteUser = async (req, res) => {
  if (!req?.body?.id)
    return res.status(400).json({ message: "User ID required" });
  const user = await userModel.findOne({ _id: req.body.id }).exec();
  if (!user) {
    return res
      .status(204)
      .json({ message: `User ID ${req.body.id} not found` });
  }
  const result = await user.deleteOne({ _id: req.body.id });
  res.json(result);
};
// Updates single user item using a provided ID. Can update multiple or single part of object.
export const updateUser = async (req, res) => {};
