import { NextFunction, Request, Response } from 'express';
import getStringFromRequest from './utils/requestObjToStr';
import { decodeBase64, encodeBase64 } from './utils/encoder';
import { AmnesiaClient } from '@amnesia-js/core';

export class CacheMiddlewareFactory {
  private ac: AmnesiaClient;

  constructor() {
    this.ac = new AmnesiaClient();
  }

  async connect(options: { port?: number, host?: string }) {
    await this.ac.connect({ ...options });
  }

  getMiddleware(options: { ttl?: string, nfetch?: number } | null) {
    return this.makeItSuffer.bind(this, options??{});
  }

  async makeItSuffer(options, request: Request, response: Response, next: NextFunction) {
    const key = encodeBase64(getStringFromRequest(request));
    const v = await this.ac.get(key);

    if (v) {
      response.setHeader('Content-Type', 'application/json');
      response.send(decodeBase64(v));
      return;
    }

    let oldWrite = response.write;
    let oldEnd = response.end;
    let chunks = [];
    response.write = function (chunk) {
      chunks.push(chunk);
      return oldWrite.apply(response, arguments);
    };

    response.end = async (...args) => {
      const chunk = args[0];
      if (chunk) {
        chunks.push(chunk);
      }

      let body = Buffer.concat(chunks).toString('utf-8');
      // Accessing Response body here
      await this.ac.set(key, encodeBase64(body), options);
      //
      oldEnd.apply(response, args);
    };

    next?.();
  }
}
