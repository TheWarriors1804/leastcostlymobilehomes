const Sequelize = require('sequelize');
const db = require('../db');

const Product = db.define('product', {
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.STRING
  },
  location: {
    type: Sequelize.STRING
  },
  length: {
    type: Sequelize.DECIMAL(10, 2)
  },
  width: {
    type: Sequelize.DECIMAL(10, 2)
  },
  height: {
    type: Sequelize.DECIMAL(10, 2)
  },
  type: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.TEXT
  },
  year: {
    type: Sequelize.INTEGER
  },
  bedrooms: {
    type: Sequelize.DECIMAL(10, 1)
  },
  bathrooms: {
    type: Sequelize.DECIMAL(10, 1)
  },
  manufacturer: {
    type: Sequelize.STRING
  }
});

module.exports = Product;
