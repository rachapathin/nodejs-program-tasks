/* eslint-disable no-console */
var Products = require('../models/mongo/products'); 

function getAllProducts(req, res) {
  Products.find()
    .then((products) => {
      if (!products.length) {
        console.log('No products found');
        res.status(400).send('No products found');
      }

      res.json(products);
    })
    .catch((err) => console.log('Error:', err));
}

function getProduct(req, res) {
  Products.findById(req.params.id)
    .then((product) => {
      if (!product) {
        console.log('No product found');
        res.status(400).send('No product found');
      }
      res.json(product);
    })
    .catch((err) => console.log('Error:', err));
}


function addProduct(req, res) {
  const { name, price, reviews } = req.body;
  Products.create({ name, price, reviews })
    .then((product) => res.json(product))
    .catch((error) => console.log('Error:', error));
}

function getReviews(req, res) {
  Products.findById(req.params.id)
    .then((product) => {
      if (!product) {
        res.send('No product found');
      }
      if (!product.reviews) {
        res.send('No reviews found');
      }
      res.send(JSON.stringify(product.reviews));
    })
    .catch((error) => console.log('Error:', error));
}

module.exports = { getAllProducts, getProduct, addProduct, getReviews };
