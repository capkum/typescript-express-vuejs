import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import methodOverride from 'method-override';
import bodyParser from 'body-parser';
import session from 'express-session';
import passport from 'passport';
import favicon from 'serve-favicon';
import nunjucks from 'nunjucks';
import mongoose from 'mongoose';
import bluebird from 'bluebird';

import { WinstonLogger, LoggerStream } from '../lib/winstonLogger';
import { PassportConf } from '../lib/passportConfig';

export class Conf extends WinstonLogger {
  public app: express.Application;

  constructor (app: express.Application) {
    super();
    this.app = app;
  }

  public config () {
    // favicon
    this.app.use(favicon(path.join(__dirname, '..', 'assets', 'img', 'monhun.ico')));

    // js, common path
    this.app.use(express.static(path.join(__dirname, '..', 'assets')));

    // view templates path
    this.app.set('views', path.join(__dirname, '..'));

    // view engjine nunjucks config
    nunjucks.configure(this.app.get('views'), {
      autoescape: true,
      express: this.app
    });
    this.app.set('view engine', 'njk');

    // use json parser
    this.app.use(bodyParser.json());

    // use query string parser
    this.app.use(bodyParser.urlencoded({
      extended: true
    }));

    // use method override
    this.app.use(methodOverride());

    // use cookie parser
    // signature: SECRET GOES HERE
    this.app.use(cookieParser('SECRET_GOES_HERE'));

    // use winston logger
    this.logger.info(`** success express config loaded  **`);
    this.app.use(require('morgan')('dev',
      {
        stream: new LoggerStream()
      },
      {
        flags: 'a'
      }
    ));

    // use session
    this.app.use(session({
      secret: 'secretcode',
      resave: true,
      saveUninitialized: false
    }));

    // use passport
    this.app.use(passport.initialize());
    this.app.use(passport.session());
    new PassportConf().passportConf();

    // mongoose
    let dbUri: string = '';
    let options: Object = {};
    mongoose.Promise = bluebird;
    // mongoose.Promise = global.Promise;
    options = {
      poolSize: 10,
      useNewUrlParser: true
    };

    switch (process.env.NODE_ENV) {
      case 'development':
        dbUri = 'mongodb://test:test@localhost:27017/test';
        mongoose.connect(dbUri, options);
        break;

      case 'product':
        dbUri = 'mongodb://test:test@localhost:27017/test';
        mongoose.connect(dbUri, options);
        break;

      default:
        break;
    }

    const db = mongoose.connection;
    db.on('error', this.logger.error.bind(console, 'connection error'));
    db.once('open', () => {
      this.logger.debug('Connected to mongod server');
    });
  }

}
