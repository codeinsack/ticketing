import request from 'supertest';
import { app } from '../../app';

it('Returns a 201 on successful signup', async () =>
  request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.io',
      password: 'pass123',
    })
    .expect(201));

it('Returns a 400 with an invalid email', async () =>
  request(app)
    .post('/api/users/signup')
    .send({
      email: 'sfasdfasdf',
      password: 'pass123',
    })
    .expect(400));

it('Returns a 400 with an invalid password', async () =>
  request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.io',
      password: 'p',
    })
    .expect(400));

it('Returns a 400 with missing email and password', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.io' })
    .expect(400);

  await request(app)
    .post('/api/users/signup')
    .send({ password: 'pass123' })
    .expect(400);
});
