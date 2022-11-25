import express from 'express';

import { getExpenseVendors, createExpenseVendor, getExpenseVendor, deleteExpenseVendor, updateExpenseVendor } from '../../../Controllers/Finances/Lists/expenseVendor.js';

const router = express.Router();

router.get('/', getExpenseVendors);

router.post('/', createExpenseVendor);

router.get('/:id', getExpenseVendor);

router.delete('/:id', deleteExpenseVendor);

router.patch('/:id', updateExpenseVendor);

export default router;