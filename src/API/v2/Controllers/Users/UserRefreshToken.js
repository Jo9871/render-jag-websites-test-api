import moment from "moment";
import { userModel } from "../../../../Config/Database Configs/Auth/Schema/Users.js";

// Returns single user from the database using a provided ID.
export const getUser = async (req, res) => {
  if (!req?.params?.token)
    return res.status(400).json({ message: "Refresh token required" });
  const user = await userModel
    .findOne({ refreshToken: req.params.token })
    .exec();
  if (!user) {
    return res
      .status(204)
      .json({ message: `Refresh token ${req.params.token} not found` });
  }
  res.json(user);
};
