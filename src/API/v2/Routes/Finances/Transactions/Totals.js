import express from 'express';

import { getIncomeTotals, getExpensesTotals, getTransfersTotals, getAllTotals } from '../../../Controllers/Finances/Transactions/Totals.js';

const router = express.Router();

router.get('/income', getIncomeTotals);

router.get('/expenses', getExpensesTotals);

router.get('/transfers', getTransfersTotals);

router.get('/', getAllTotals);

export default router;