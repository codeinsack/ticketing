import request from 'supertest';
import { app } from '../../app';

it('Fails when an email that does not exist is supplied', async () =>
  request(app)
    .post('/api/users/signIn')
    .send({
      email: 'test@test.io',
      password: 'pass123',
    })
    .expect(400));

it('Fails when an incorrect password is supplied', async () => {
  await request(app)
    .post('/api/users/signUp')
    .send({
      email: 'test@test.io',
      password: 'pass123',
    })
    .expect(201);

  await request(app)
    .post('/api/users/signIn')
    .send({
      email: 'test@test.io',
      password: 'fasfef',
    })
    .expect(400);
});

it('Responds with a cookie when given valid credentials', async () => {
  await request(app)
    .post('/api/users/signUp')
    .send({
      email: 'test@test.io',
      password: 'pass123',
    })
    .expect(201);

  const response = await request(app)
    .post('/api/users/signIn')
    .send({
      email: 'test@test.io',
      password: 'pass123',
    })
    .expect(200);

  expect(response.get('Set-Cookie')).toBeDefined();
});
