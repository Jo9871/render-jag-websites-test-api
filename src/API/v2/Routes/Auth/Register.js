import express from "express";

import { handleNewUser } from "../../Controllers/Auth/Register.js";

const router = express.Router();

// router.get('/', getTransferTransactions);

router.post("/", handleNewUser);

// router.get('/:id', getTransferTransaction);

// router.delete('/:id', deleteTransferTransaction);

// router.patch('/:id', updateTransferTransaction);

export default router;
