import mongoose from "mongoose";

import { ROLES_LIST } from "../../../Constants.js"
import { usersConnection } from "../authConnections.js";

const userSchema = mongoose.Schema({
 username: {
        type: String,
        required: true
    },
    roles: {
        User: {
            type: Number,
            default: ROLES_LIST.USER
        },
        Admin: Number,
        Super_Admin: Number,
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: String
});

export const userModel = usersConnection.model(
  "users",
  userSchema
);

// module.exports = {
//     userModel
// };
