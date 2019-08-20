const express = require('express');
const helmet = require('helmet');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);

const usersRouter = require('./routes/user');
const knexConnection = require('../data/dbconfig');

const server = express();

const sessionOptions = {
  name: 'helloworld',
  secret: process.env.COOKIE_SECRET || "Loose lips sink ships!",
  cookie: {
    secure: process.env.COOKIE_SECURE || false,
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true
  },
  resave: false,
  saveUninitialized: process.env.COOKIE_SAVEUNINITIALIZED || true,
  store: new KnexSessionStore({
    knex: knexConnection,
    createtable: true,
    clearInterval: 1000 * 60 * 60 * 24
  })
};

server.use(helmet());
server.use(express.json());
server.use(session(sessionOptions));

server.use('/auth/users', usersRouter);

server.get('/', (req, res) => {
  // res.send('<h2>Five by Five</h2>');
  res.json({ api: 'the api', session: req.session });
});

module.exports = server;