
/*
eslint-disable no-console
 */

import 'babel-polyfill';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { host, port } from './config';
import route from './route';

const app = express();

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use(cookieParser('my cookie key'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

const morgan = require('morgan');
app.use(morgan('dev'));

/*
注册API
 */
app.use('/route', route);


app.listen(port, () => {
  console.log(`The server is running at http://${host}/`);
});
