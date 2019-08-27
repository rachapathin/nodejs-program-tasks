import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  lastModifiedDate: Date,
});

const user = mongoose.model('user', userSchema);

export default user;