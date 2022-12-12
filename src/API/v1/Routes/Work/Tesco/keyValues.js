import express from "express";

import {
  getEstimatedPay,
  getKeyValues,
  updateKeyValues
} from "../../../Controllers/Work/Tesco/keyValues.js";

const router = express.Router();

router.get("/estimatedpay", getEstimatedPay);
router.get("/update", updateKeyValues);
router.get("/", getKeyValues);

export default router;
