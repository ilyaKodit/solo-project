const express = require('express');
const logger = require('morgan');
const path = require('path');
const hbs = require('hbs');
// const session = require('express-session');
// const FileStore = require("session-file-store")(session);
const bodyParser = require('body-parser');

const port =  process.env.PORT || 3000;

const app = express();

// app.use(session({
//     store: new FileStore(),
//     key: "user_sid",
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         expires: 6000000
//     }
// }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const indexRouter = require('./routes/index');
const paymentRouter = require('./routes/payment');
const statusRouter = require('./routes/status');

app.use('/', indexRouter);
app.use('/payment', paymentRouter);
app.use('/status', statusRouter);

app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));


// views engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.listen(port);
