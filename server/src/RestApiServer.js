import express from 'express';
import { apiPlate } from './apiPlate.js';
// import { createRequire } from "module";
// const require = createRequire(import.meta.url);
import morgan from 'morgan';
import cors from 'cors';
import http from 'http';
import https from 'https';

const DEFAULT_PORT_HTTP = 3502;
const DEFAULT_PORT_HTTPS = 3503;

export default class RestApiServer {
  constructor(tlsOption, portHttp = DEFAULT_PORT_HTTP, portHttps = DEFAULT_PORT_HTTPS) {
    this.portHttp = portHttp;
    this.portHttps = portHttps;

    const app = express();

    app.use(cors());

    app.use(morgan('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    app.post('/plate', (req, res) => {
      return apiPlate(req, res)
    });

    const httpServer = http.createServer(app);
    httpServer.listen(this.portHttp, () => {
      this.debug('REST API HTTP server on ' + this.portHttp);
    });

    const httpsServer = https.createServer(tlsOption, app);
    httpsServer.listen(this.portHttps, () => {
      this.debug('REST API HTTPS server on ' + this.portHttps);
    });
  }

  debug = m => console.log('[RestApiServer]', m);
}
