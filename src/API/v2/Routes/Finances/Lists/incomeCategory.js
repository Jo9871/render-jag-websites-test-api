import express from 'express';

import { getIncomeCategories, createIncomeCategory, getIncomeCategory, deleteIncomeCategory, updateIncomeCategory } from '../../../Controllers/Finances/Lists/incomeCategory.js';

const router = express.Router();

router.get('/', getIncomeCategories);

router.post('/', createIncomeCategory);

router.get('/:id', getIncomeCategory);

router.delete('/:id', deleteIncomeCategory);

router.patch('/:id', updateIncomeCategory);

export default router;