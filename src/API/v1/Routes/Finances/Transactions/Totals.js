import express from "express";

import {
  getIncomeTotals,
  getExpensesTotals,
  getTransfersTotals,
  getDailyTotals,
  getTotals,
} from "../../../Controllers/Finances/Transactions/Totals.js";

const router = express.Router();

router.get("/income", getIncomeTotals);

router.get("/expenses", getExpensesTotals);

router.get("/transfers", getTransfersTotals);

router.get("/daily", getDailyTotals);

router.get("/", getTotals);

export default router;
