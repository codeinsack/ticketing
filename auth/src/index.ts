import express from 'express';
import { json } from 'body-parser';

import { currentUserRouter } from './routes/currentUser';
import { signInRouter } from './routes/signIn';
import { signOutRouter } from './routes/signOut';
import { signUpRouter } from './routes/signUp';
import { errorHandler } from './middlewares/errorHandler';
import { NotFoundError } from './errors/NotFoundError';

const app = express();
app.use(json());

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);

app.get('*', () => {
  throw new NotFoundError();
});

app.use(errorHandler);

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
