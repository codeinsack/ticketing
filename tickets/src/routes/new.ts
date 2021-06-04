import express from 'express';
import { requireAuth } from '@t1cketing/common';

const router = express.Router();

router.post('/api/tickets', requireAuth, (req, res) => {
  res.sendStatus(200);
});

export { router as createTicketRouter };
