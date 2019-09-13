var mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  lastModifiedDate: Date,
});

// eslint-disable-next-line func-names
userSchema.pre('save', function (next) {
  const date = new Date();
  this.lastModifiedDate = date;
  next();
});

const user = mongoose.model('user', userSchema);

module.exports = user;
