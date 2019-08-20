const express = require('express');
const bcrypt = require('bcryptjs');

const mw = require('../middleware/middleware');
const Users = require('../models/user-model');

const router = express.Router();

router.get('/', mw.restrict, (req, res) => {
  Users.find()
    .then( users => {
      res.status(200).json(users);
    })
    .catch( err => {
      res.status(500).json({ error: 'there was an error getting users' });
    })
});

router.get('/logout', (req, res) => {
  if(req.session && req.session.loggedIn) {
    req.session.destroy();
    res.status(200).json({ message: 'Your have logged out succesfully' });
  }
})

router.post('/register', mw.checkUsernameAndPass, (req, res) => {
  const user = req.body;

  user.password = gethash(user.password);

  Users.add(user)
    .then( saved => {
      res.status(201).json(saved);
    })
    .catch( err => {
      res.status(500).json({ message: 'there was an error registering the user' })
    })
});

router.post('/login', mw.checkUsernameAndPass, (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then( user => {
      if(user && bcrypt.compareSync(password, user.password)) {
        req.session.username = user.username;
        req.session.loggedIn = true;
        res.status(200).json({ message: `Welcome ${user.username}!` });
      } else {
        res.status(401).json({ message: 'Invalid Credentails' });
      }
    })
    .catch( err => {
      res.status(500).json(err);
    })
});

function gethash(toHash) {
  return bcrypt.hashSync(toHash, 14);
};

module.exports = router;