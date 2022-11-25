import express from "express";

import { getUser } from "../../Controllers/Users/UserRefreshToken.js";

const router = express.Router();

router.get("/:token", getUser);

export default router;
