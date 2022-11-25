import express from "express";

import { handleLogin } from "../../Controllers/Auth/Login.js";

const router = express.Router();

// router.get('/', getTransferTransactions);

router.post("/", handleLogin);

// router.get('/:id', getTransferTransaction);

// router.delete('/:id', deleteTransferTransaction);

// router.patch('/:id', updateTransferTransaction);

export default router;
