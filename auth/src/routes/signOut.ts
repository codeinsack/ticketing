import express from 'express';

const router = express.Router();

router.post('/api/users/signOut', (req, res) => {
  res.send('Sign Out Route');
});

export { router as signOutRouter };
