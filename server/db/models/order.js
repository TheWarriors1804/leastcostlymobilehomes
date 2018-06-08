const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  complete: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  initiatedDate: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  purchaseDate: {
    type: Sequelize.DATE
  }
})

module.exports = Order
