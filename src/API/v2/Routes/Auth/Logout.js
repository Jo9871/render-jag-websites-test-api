import express from "express";

import { handleLogout } from "../../Controllers/Auth/Logout.js";

const router = express.Router();

router.get("/", handleLogout);

// router.post('/', createTransferTransaction);

// router.get('/:id', getTransferTransaction);

// router.delete('/:id', deleteTransferTransaction);

// router.patch('/:id', updateTransferTransaction);

export default router;
