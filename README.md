# @amnesia-js/express-cache
**Short Description**: A library to help express suffer from Amnesia.

**Long Description**: This library provides middleware to help express cache responses using [AmnesiaDB](https://github.com/NikhilCodes/AmnesiaDB)

Example:
```javascript
let acm = new CacheMiddlewareFactory();
acm.connect({}) // Connecting to default port and host

app.use((req, res, next) => acm.makeItSuffer(req, res, next));  // Attaching middleware
```
