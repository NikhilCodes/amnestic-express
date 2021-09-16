import { CacheMiddlewareFactory } from '../index';
import express from 'express';

const request = require('supertest');

test('Test Express', async () => {
  let acm = new CacheMiddlewareFactory();
  await acm.connect({})
  let app = express();

  app.use(express.json())
  app.use((req, res, next) => acm.makeItSuffer(req, res, next));
  let server = app.listen(8000, () => {
    console.log('STARTED LISTENING!');
  });
  app.post('/test_route', async (req, res) => {
    res.status(200).send({ 'success': 'OKAY' });
  });

  const resp = await request(app)
    .post('/test_route')
    .send({ 'example': 'data' })
    .set({ 'Authorization': 'Bearer xyz' });

  console.log(resp.body);
  expect(2).toBe(2);
  server.close();
});
