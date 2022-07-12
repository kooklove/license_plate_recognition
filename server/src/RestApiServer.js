import express from 'express';

import { apiPlate } from './apiPlate.Solr.js';
// import { apiPlate, apiPlatePartial } from './apiPlate.js';
import { apiPlateFaked } from './apiPlateFaked.js';
// import { createRequire } from "module";
// const require = createRequire(import.meta.url);
import morgan from 'morgan';
import cors from 'cors';
import http from 'http';
import https from 'https';

import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';


const DEFAULT_PORT_HTTP = 3502;
const DEFAULT_PORT_HTTPS = 3503;

export default class RestApiServer {
  constructor(tlsOption, portHttp = DEFAULT_PORT_HTTP, portHttps = DEFAULT_PORT_HTTPS) {
    this.portHttp = portHttp;
    this.portHttps = portHttps;

    const app = express();
    dotenv.config();
    app.use(cors());

    app.use(morgan('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    // 임시 id, pw 배열 , DB 로 변경 필요
    const users = [
      { id: "hello", pw: "world" },
      { id: "good", pw: "bye" },
    ];

    // 로그인 id, pw 확인
    const login = (id, pw) => {
      let len = users.length;

      for (let i = 0; i < len; i++) {
          if (id === users[i].id && pw === users[i].pw) return id;
      }

      return "";
    };

    // access token을 secret key 기반으로 생성
    const generateAccessToken = (id) => {
      return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: "4h",
      });
    };

    // refersh token을 secret key  기반으로 생성
    const generateRefreshToken = (id) => {
      return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
          expiresIn: "180 days",
      });
    };

    // login 요청 및 성공시 access token, refresh token 발급
    app.post("/login", (req, res) => {
      let id = req.body.id;
      let pw = req.body.pw;

      let user = login(id, pw);
      if (user === "") return res.sendStatus(500);

      let accessToken = generateAccessToken(user);
      let refreshToken = generateRefreshToken(user);

      res.json({ accessToken, refreshToken });
    });

    // access token의 유효성 검사
    const authenticateAccessToken = (req, res, next) => {
      let authHeader = req.headers["authorization"];
      let token = authHeader && authHeader.split(" ")[1];

      if (!token) {
          console.log("wrong token format or token is not sended");
          return res.sendStatus(400);
      }

      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
          if (error) {
              console.log(error);
              return res.sendStatus(403);
          }
          
          req.user = user;
          next();
      });
    };

    // access token을 refresh token 기반으로 재발급
    app.post("/refresh", (req, res) => {
      let refreshToken = req.body.refreshToken;
      if (!refreshToken) return res.sendStatus(401);

      jwt.verify(
          refreshToken,
          process.env.REFRESH_TOKEN_SECRET,
          (error, user) => {
              if (error) return res.sendStatus(403);

              const accessToken = generateAccessToken(user.id);

              res.json({ accessToken });
          }
      );
    });

    // access token 유효성 확인을 위한 예시 요청
    app.get("/user", authenticateAccessToken, (req, res) => {
      console.log(req.user);
      res.json(users.filter((user) => user.id === req.user.id));
    });


    app.post('/plateFaked',authenticateAccessToken, (req, res) => {
      return apiPlateFaked(req, res)
    });

    app.get('/platenumber/:platenumber', (req, res) => {
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
