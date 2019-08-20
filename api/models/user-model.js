const usersDB = require('../../data/dbconfig');

module.exports = {
  find,
  findBy,
  findById,
  add
}

function find() {
  return usersDB('users');
}

function findBy(filter) {
  return usersDB('users').where(filter);
}

function findById(id) {
  return usersDB('users')
    .where({ id })
    .first();
}

function add(user) {
  return usersDB('users')
    .insert(user, 'id')
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
}