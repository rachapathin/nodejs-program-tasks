var mongoose = require('mongoose');

const citiesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [3, 'City name is too short'],
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

citiesSchema.pre('save', (next) => {
  const date = new Date();
  this.lastModifiedDate = date;
  next();
});

const City = mongoose.model('City', citiesSchema);

module.exports = City;
