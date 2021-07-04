import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { natsWrapper } from '../../natsWrapper';
import { Ticket } from '../../models/Ticket';

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
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signIn())
    .send({
      title: 'Title 1',
      price: 20,
    });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', global.signIn())
    .send({
      title: 'Title 2',
      price: 20,
    })
    .expect(401);
});

it('Returns 400 if the user provides an invalid title or price', async () => {
  const cookie = global.signIn();

  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
      title: 'Title 1',
      price: 20,
    });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: '',
      price: 20,
    })
    .expect(400);
});

it('Updates the ticket provided valid inputs', async () => {
  const cookie = global.signIn();

  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
      title: 'Title 1',
      price: 20,
    });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'New Title',
      price: 20,
    })
    .expect(200);

  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send();

  expect(ticketResponse.body.title).toEqual('New Title');
  expect(ticketResponse.body.price).toEqual(20);
});

it('Publishes an event', async () => {
  const cookie = global.signIn();

  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
      title: 'Title 1',
      price: 20,
    });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'New Title',
      price: 20,
    })
    .expect(200);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});

it('Rejects updates if the ticket is reserved', async () => {
  const cookie = global.signIn();

  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
      title: 'Title 1',
      price: 20,
    });

  const ticket = await Ticket.findById(response.body.id);
  ticket!.set({ orderId: mongoose.Types.ObjectId().toHexString() });
  await ticket!.save();

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'New Title',
      price: 20,
    })
    .expect(400);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
