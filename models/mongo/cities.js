
import mongoose from 'mongoose';

const citiesSchema = new mongoose.Schema({
  name: {
    type: String,
    validate: {
      validator(val) {
        return /^[A-Z]/.test(val);
      },
      message: '{VALUE} should start with uppercase letter',
    },
  },
  country: { type: String },
  capital: {
    type: Boolean,
    default: false,
  },
  location: {
    lat: {
      type: Number,
      default: 0,
    },
    long: {
      type: Number,
      default: 0,
    },
  },
  lastModifiedDate: Date,
});

const Cities = mongoose.model('Cities', citiesSchema);

export default Cities;