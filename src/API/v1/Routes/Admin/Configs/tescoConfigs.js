import express from "express";

import { getContractedHours } from "../../../Controllers/Admin/Configs/tescoConfigs.js";

const router = express.Router();

router.get("/", getContractedHours);

// router.post("/", createExpenseTransaction);

// router.get("/:id", getExpenseTransaction);

// router.delete("/:id", deleteExpenseTransaction);

// router.patch("/:id", updateExpenseTransaction);

export default router;
