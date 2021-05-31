import request from 'supertest';
import { app } from '../../app';

it('Returns a 201 on successful signup', async () =>
  request(app)
    .post('api/users/signup')
    .send({
      email: 'test@test.io',
      password: 'pass123',
    })
    .expect(201));
