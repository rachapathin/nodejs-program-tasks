/* eslint-disable no-console */
var Users = require('../models/users');

function getAllUsers(req, res) {
  Users.find()
    .then((users) => {
      // show error if users not avilable
      if (!users.length) {
        res.send('No users found');
      } else {
        res.json(users);
      }
    })
    .catch((error) => console.log('Error: ', error));
}

function addUser(req, res) {
  const { firstname, lastname, email } = req.body;
  Users.create({ firstname, lastname, email })
    .then((user) => res.json(user))
    .catch((error) => console.log('Error:', error));
}

module.exports = { getAllUsers, addUser };
