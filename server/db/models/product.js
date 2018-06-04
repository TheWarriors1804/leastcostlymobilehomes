const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  price: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.STRING,
  },
  location: {
    type: Sequelize.STRING,
  },
  length: {

  },
  width: {

  },
  height: {

  },
  type: {

  },

})
