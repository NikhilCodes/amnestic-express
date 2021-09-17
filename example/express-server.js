import express from 'express';
import { CacheMiddlewareFactory } from '@amnesia-js/express-cache';

const app = express();

const acm = new CacheMiddlewareFactory();
acm.connect({});

app.use(acm.getMiddleware({ nfetch: 2 }));

app.post('/', async (req, res) => {
  await new Promise(resolve => {
    setTimeout(() => resolve(), 5000);
  });

  res.send({
    sample: 'data',
  });
});

app.listen(8080, () => {
  console.log('Example server listening...\nAt http://localhost:8080');
});
