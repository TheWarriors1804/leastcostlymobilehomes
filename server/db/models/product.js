const Sequelize = require('sequelize')
const db = require('../db')

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
    type: Sequelize.INTEGER
  },
  width: {
    type: Sequelize.INTEGER
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
    type: Sequelize.INTEGER
  },
  bathrooms: {
    type: Sequelize.INTEGER
  },
  manufacturer: {
    type: Sequelize.STRING
  },
  model: {
    type: Sequelize.STRING
    //this is the product name field
  }
})

module.exports = Product
