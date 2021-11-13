const path = require('path')
const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const app = express()
module.exports = app
// const dotenv = require('dotenv').config();

app.use(cookieParser("secret"))


// app.use(function (req, res, next) {
//   // check if client sent cookie
//   var cookie = req.cookies.cookieName;
//   if (cookie === undefined) {
//     // no: set a new cookie
//     var randomNumber=Math.random().toString();
//     randomNumber=randomNumber.substring(2,randomNumber.length);
//     res.cookie('cookieName',randomNumber, { maxAge: 900000, httpOnly: true });
//     console.log('cookie created successfully');
//   } else {
//     // yes, cookie was already present 
//     console.log('cookie exists', cookie);
//   } 
//   next(); // <-- important!
// });
// logging middleware
app.use(morgan('dev'))

// body parsing middleware
app.use(express.json())

// auth and api routes
app.use('/auth', require('./auth'))
app.use('/api', require('./api'))

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '..', 'public/index.html')));

// static file-serving middleware
app.use(express.static(path.join(__dirname, '..', 'public')))

// any remaining requests with an extension (.js, .css, etc.) send 404
app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error('Not found')
    err.status = 404
    next(err)
  } else {
    next()
  }
})

// sends index.html
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public/index.html'));
})

// error handling endware
app.use((err, req, res, next) => {
  console.error(err)
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal server error.')
})
