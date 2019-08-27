'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    reviews: DataTypes.TEXT
  }, {});
  Product.associate = function(models) {
    // associations can be defined here
  };
  return Product;
};