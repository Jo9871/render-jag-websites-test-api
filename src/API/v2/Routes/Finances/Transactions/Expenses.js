import express from 'express';

import { getExpenseTransactions, createExpenseTransaction, getExpenseTransaction, deleteExpenseTransaction, updateExpenseTransaction } from '../../../Controllers/Finances/Transactions/Expenses.js';

const router = express.Router();

router.get('/', getExpenseTransactions);

router.post('/', createExpenseTransaction);

router.get('/:id', getExpenseTransaction);

router.delete('/:id', deleteExpenseTransaction);

router.patch('/:id', updateExpenseTransaction);


export default router;