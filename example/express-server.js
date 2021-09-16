import express from 'express';
import { CacheMiddlewareFactory } from '@amnesia-js/express-cache';

const app = express();

const acm = new CacheMiddlewareFactory();
acm.connect({});

app.use((req, res, next) => acm.makeItSuffer(req, res, next));

app.post('/', async (req, res) => {
  console.log(req.headers)
  await new Promise(resolve => {
    setTimeout(() => resolve(), 5000);
  });
  console.log("For First time probably, unless you have something in your header that changes each time")
  res.send({
    sample: 'data',
  });
});

app.listen(8080, () => {
  console.log('Example server listening...\nAt http://localhost:8080');
});
