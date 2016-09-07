/*
eslint-disable no-param-reassign
 */

import { Router } from 'express';

const router = new Router();

router.use('/', (req, res) => {
  res.send({ ret: 0, data: 'hell, world' });
});

export default router;
