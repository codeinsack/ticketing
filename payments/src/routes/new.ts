import express, { Request, Response } from 'express';
import { requireAuth } from '@t1cketing/common';
import { body } from 'express-validator';

const router = express.Router();

router.post(
  '/api/payments',
  requireAuth,
  [body('token').not().isEmpty(), body('orderId').not().isEmpty()],
  async (req: Request, res: Response) => {
    res.send({ success: true });
  },
);

export { router as createChargeRouter };
