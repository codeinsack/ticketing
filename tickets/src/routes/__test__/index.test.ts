import request from 'supertest';
import { app } from '../../app';

const createTicket = (title: string, price: number) =>
  request(app)
    .post('/api/tickets')
    .set('Cookie', global.signIn())
    .send({
      title,
      price,
    })
    .expect(201);

it('Can fetch a list of tickets', async () => {
  const title = 'concert';
  const price = 20;

  await createTicket(title, price);
  await createTicket(title, price);
  await createTicket(title, price);

  const response = await request(app)
    .get('/api/tickets')
    .send()
    .expect(200);

  expect(response.body.length).toEqual(3);
});
