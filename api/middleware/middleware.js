// const bcrypt = require('bcryptjs');
const Users = require('../models/user-model');

module.exports = {
  checkUsernameAndPass,
  restrict
};

function checkUsernameAndPass(req, res, next) {
  const { username, password } = req.body;
  let error = 0;

  if( username === undefined || username.trim() === '' ) { error++; }
  if( password === undefined || password.trim() === '' ) { error = error + 2; }

  switch(error) {
    case 1:
      return res.status(400).json({ error: 'Username is required' });
    case 2:
      return res.status(400).json({ error: 'Password is required' });
    case 3:
      return res.status(400).json({ error: 'Username and Password is required' });
    default:
      next();
  }
};

function restrict(req, res, next) {
  if( req.session && req.session.loggedIn) {
    next();
  } else {
    res.status(401).json({ message: 'Invalid Credentials' });
  }
}

// function restrict(req, res, next) {
//   const { username, password } = req.headers;
  
//   let error = 0;

//   if( username === undefined || username.trim() === '' ) { error++; }
//   if( password === undefined || password.trim() === '' ) { error = error + 2; }

//   switch(error) {
//     case 1:
//       return res.status(400).json({ error: 'Username is required' });
//     case 2:
//       return res.status(400).json({ error: 'Password is required' });
//     case 3:
//       return res.status(400).json({ error: 'Username and Password is required' });
//     default:
//       Users.findBy({ username })
//         .first()
//         .then( user => {
//           if(user && bcrypt.compareSync(password, user.password)) {
//             next();
//           } else {
//             res.status(401).json({ error: 'INvalid Credentials' });
//           }
//         })
//         .catch( err => {
//           res.status(500).json(err);
//         });
//   }
// }