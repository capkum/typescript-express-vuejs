import express from "express";
import { Request, Response, NextFunction as nextFunc } from 'express';
import * as bodyParser from "body-parser";
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import * as path from "path";
import errorHandler = require("errorhandler");
import methodOverride = require("method-override");
import fs from 'fs';

// class Server
export class Server {
  public app: express.Application;

  public static bootstrap(): Server {
    return new Server();
  }

  constructor() {
    this.app = express();
    this.config();
    this.routes();
    this.api();
  }

  public config() {
    // write access log
    // ToDo 추후 외부로 빼서 에러로그와 접속로그를 분리.
    // 에러로그도 기록되게 해야됨
    let log_path: string = path.join(__dirname, 'access.log');
    let accessLogStream: fs.WriteStream = fs.createWriteStream(log_path, {
      flags: 'a'
    });

    // js, common path
    this.app.use(express.static(path.join(__dirname, 'assets')));

    // view template engin
    this.app.set('views', path.join(__dirname));
    this.app.set('view engin', 'jinja');

    // use logger
    this.app.use(logger('dev', {
      stream: accessLogStream
    })); //개발시 
    // this.app.use(logger('combined', {
    //   stream: accessLogStream
    // }));

    // use query string parser
    this.app.use(bodyParser.urlencoded({ extended: true }));

    // use json parser
    this.app.use(bodyParser.json());

    // use cookie parser
    // signature: SECRET GOES HERE
    this.app.use(cookieParser('SECRET_GOES_HERE'));

    // use method override
    this.app.use(methodOverride());

    //catch 404 and forward to error handler
    this.app.use((next: nextFunc, req: Request, res: Response, err: any) => {
      err.status = 404;
      next(err);
    });

    // use error handling
    this.app.use(errorHandler());
  }

  public routes() {

  }

  public api() {

  }
}
