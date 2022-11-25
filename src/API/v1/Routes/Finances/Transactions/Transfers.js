import express from 'express';

import { getTransferTransactions, createTransferTransaction, getTransferTransaction, deleteTransferTransaction, updateTransferTransaction } from '../../../Controllers/Finances/Transactions/Transfers.js';

const router = express.Router();

router.get('/', getTransferTransactions);

router.post('/', createTransferTransaction);

router.get('/:id', getTransferTransaction);

router.delete('/:id', deleteTransferTransaction);

router.patch('/:id', updateTransferTransaction);

export default router;