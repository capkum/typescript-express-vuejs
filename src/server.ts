import express, { NextFunction } from "express";
import { Request, Response, NextFunction as nextFunc } from 'express';
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import * as path from "path";
import createError from "http-errors";
import fs from 'fs';
import { Apps } from "./routes/apps";

interface IError {
  status?: number;
  message?: string;
}

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
    this.errorHandler();
  }

  public config() {
    // write access log
    // ToDo 추후 외부로 빼서 에러로그와 접속로그를 분리.
    // 에러로그도 기록되게 해야됨
    let logDir: string = path.join(__dirname, 'log');
    fs.existsSync(logDir) || fs.mkdirSync(logDir);

    let accessLog: string = path.join(logDir, 'access.log');
    let errorLog: string = path.join(logDir, 'error.log');
    let accessLogStream: fs.WriteStream = fs.createWriteStream(accessLog, {
      flags: 'a'
    });
    let errorLogStream: fs.WriteStream = fs.createWriteStream(errorLog, {
      flags: 'a'
    });

    // js, common path
    this.app.use(express.static(path.join(__dirname, 'assets')));

    // view template engin
    this.app.set('views', path.join(__dirname));
    this.app.set('view engine', 'ejs');

    // use logger
    this.app.use(logger('dev'));
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
  }

  public routes() {
    let router: express.Router;
    router = express.Router();

    new Apps(router).apps();

    this.app.use(router);

  }

  public api() {
  }

  // catch 404 and forward to error handler
  public errorHandler() {
    this.app.use((req: Request, res: Response, next: nextFunc) => {
      next(createError(404));
    });

    this.app.use((err: IError, req: Request, res: Response, next: nextFunc) => {
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      // render the error page
      res.status(err.status || 500);
      // res.render('views/error');
      console.log(err.message);
      console.error(err.status);
      next();
    });
  }
}
