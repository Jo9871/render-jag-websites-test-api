import express from 'express';

import { getAllFilteredTotals } from '../../../Controllers/Finances/Transactions/Filtered.js';

const router = express.Router();

router.get('/all', getAllFilteredTotals);

export default router;