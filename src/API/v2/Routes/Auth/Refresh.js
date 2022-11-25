import express from "express";

import { handleRefreshToken } from "../../Controllers/Auth/Refresh.js";

const router = express.Router();

router.get("/", handleRefreshToken);

// router.post('/', handleRefreshToken);

// router.get('/:id', getTransferTransaction);

// router.delete('/:id', deleteTransferTransaction);

// router.patch('/:id', updateTransferTransaction);

export default router;
