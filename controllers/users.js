import Users from '../models/mongo/users';

export const addUser = (req, res) => {
    const { name, email } = req.body;
    Users.create({ name, email })
      .then((user) => res.status(200).json(user))
      .catch((err) => res.send(err));
}

export const getUsers = (req, res) => {
    Users.find()
      .then((users) => {
        // show erron if users not avilable
        if (!users.length) {
          res.send('No users found');
        } else {
          res.json(users);
        }
      })
      .catch((error) => console.log('Error: ', error));
}

// Delete User 

export const deleteSingleUser = (req, res) => {
    const { id: _id } = req.params;
    Users.remove({ _id }, (err, user) => {
      if (err){
          return res.send(err);
      }
      return res.send("User deleted successfully!");
    });
};