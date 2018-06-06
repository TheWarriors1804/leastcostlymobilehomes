const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  sessionId: {
    type: Sequelize.STRING,
    allowNull: false
  },
  status: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  initiatedDate: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
    allowNull: false
  },
  purchaseDate: {
    type: Sequelize.DATE
  }
})

module.exports = Order
