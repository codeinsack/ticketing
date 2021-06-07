import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';

it('Returns a 404 if the provided id does not exist', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .set('Cookie', global.signIn())
    .send({
      title: 'Title',
      price: 20,
    })
    .expect(404);
});

it('Returns a 401 if the user is not authenticated', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .send({
      title: 'Title',
      price: 20,
    })
    .expect(401);
});

it('Returns a 401 if the user does not own the ticket', async () => {
  //
});

it('Returns 400 if the user provides an invalid title or price', async () => {
  //
});

it('Updates the ticket provided valid inputs', async () => {
  //
});
