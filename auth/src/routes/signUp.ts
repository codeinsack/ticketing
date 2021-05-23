import express from 'express';

const router = express.Router();

router.post('/api/users/signUp', (req, res) => {
  res.send('Sign Up Route');
});

export { router as signUpRouter };
