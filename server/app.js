  
import "regenerator-runtime/runtime";
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import {default as engine} from 'ejs-mate';
import bodyParser from 'body-parser';
import cors from 'cors';

// dotenv
import dotenv from 'dotenv'
import fs from 'fs';
if(fs.existsSync(`${__dirname}/../.env`)){
	dotenv.config()		
}
// else use ENV in hosting service


// services
import { FirebaseService } from './services'; 

// routes
import indexRouter from './routes/index';
import usersRouter from './routes/users';
import {
	nsAuth,
	nsUsers,
	nsPayment,
} from './api';

var app = express();

app.use(logger('dev'));
// cors
app.use(cors())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// cookie
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
// view
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views')

// firebase connect
FirebaseService.initializeApp();

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(`/api/users`, nsUsers);
app.use(`/api/auth`, nsAuth);
app.use(`/api/payment`, nsPayment);

export default app;