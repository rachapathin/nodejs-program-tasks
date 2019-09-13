import mongoose from 'mongoose';

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

const product = mongoose.model('Product', productSchema);

export default product;