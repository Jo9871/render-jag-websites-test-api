import express from 'express';

import { getMoneyPockets, createMoneyPocket, getMoneyPocket, deleteMoneyPocket, updateMoneyPocket } from '../../../Controllers/Finances/Lists/moneyPocket.js';

const router = express.Router();

router.get('/', getMoneyPockets);

router.post('/', createMoneyPocket);

router.get('/:id', getMoneyPocket);

router.delete('/:id', deleteMoneyPocket);

router.patch('/:id', updateMoneyPocket);

export default router;