import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';

it('Returns an error if the ticket does not exist', async () => {
  const ticketId = mongoose.Types.ObjectId();

  await request(app)
    .post('/api/orders')
    .set('Cookie', global.signIn())
    .send({ ticketId })
    .expect(404);
});

it('Returns an error if the ticket is already reserved', async () => {
  //
});

it('Reserves a ticket', async () => {
  //
});
