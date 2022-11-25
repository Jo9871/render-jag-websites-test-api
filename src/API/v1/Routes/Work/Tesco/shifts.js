import express from "express";

import {
  createNewShift,
  getShifts,
} from "../../../Controllers/Work/Tesco/shifts.js";

const router = express.Router();

router.get("/", getShifts);
router.post("/", createNewShift);

export default router;
