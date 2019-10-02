const express = require('express');
const helmet = require('helmet');
const usersRouter = require('./routes/user');

const server = express();

server.use(helmet());
server.use(express.json());
server.use('/auth/users', usersRouter);

server.get('/', (req, res) => {
  res.send('<h2>Five by Five');
});

module.exports = server;