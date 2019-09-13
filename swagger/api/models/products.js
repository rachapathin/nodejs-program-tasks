var mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  reviews: {
    type: String,
    required: false,
  },
  lastModifiedDate: Date,
});

// eslint-disable-next-line func-names
productSchema.pre('save', function (next) {
  const date = new Date();
  this.lastModifiedDate = date;
  next();
});

const product = mongoose.model('Product', productSchema);

module.exports = product;
