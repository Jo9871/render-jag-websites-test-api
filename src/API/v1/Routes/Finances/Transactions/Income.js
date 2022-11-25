import express from 'express';

import { getIncomeTransactions, createIncomeTransaction, getIncomeTransaction, deleteIncomeTransaction, updateIncomeTransaction } from '../../../Controllers/Finances/Transactions/Income.js';

const router = express.Router();

router.get('/', getIncomeTransactions);

router.post('/', createIncomeTransaction);

router.get('/:id', getIncomeTransaction);

router.delete('/:id', deleteIncomeTransaction);

router.patch('/:id', updateIncomeTransaction);

export default router;