import express from 'express';

import { getExpenseCategories, createExpenseCategory, getExpenseCategory, deleteExpenseCategory, updateExpenseCategory } from '../../../Controllers/Finances/Lists/expenseCategory.js';

const router = express.Router();

router.get('/', getExpenseCategories);

router.post('/', createExpenseCategory);

router.get('/:id', getExpenseCategory);

router.delete('/:id', deleteExpenseCategory);

router.patch('/:id', updateExpenseCategory);

export default router;