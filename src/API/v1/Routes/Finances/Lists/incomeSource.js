import express from "express";

import {
  getIncomeSources,
  createIncomeSource,
  getIncomeSource,
  deleteIncomeSource,
  updateIncomeSource,
} from "../../../Controllers/Finances/Lists/incomeSource.js";

const router = express.Router();

router.get("/", getIncomeSources);

router.post("/", createIncomeSource);

router.get("/:id", getIncomeSource);

router.delete("/:id", deleteIncomeSource);

router.patch("/:id", updateIncomeSource);

export default router;
