# @amnesia-js/express-cache
**Short Description**: A library to help express suffer from Amnesia.

**Long Description**: This library provides middleware to help express cache responses using [AmnesiaDB](https://github.com/NikhilCodes/AmnesiaDB)

Example:
```javascript
import { CacheMiddlewareFactory } from '@amnesia-js/express-cache';

let acm = new CacheMiddlewareFactory();
acm.connect({ port: 4224 }) // Connecting to default port and host

app.use(acm.getMiddleware({ nfetch: 2 }));  // Attaching middleware
```
