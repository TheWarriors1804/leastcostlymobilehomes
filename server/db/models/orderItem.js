const Sequelize = require('sequelize');
const db = require('../db');

const OrderItem = db.define('orderItem', {
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  updatedAt: {
    type: Sequelize.DATE
  },
  productId: {
    type: Sequelize.STRING
  },
  orderId: {
    type: Sequelize.STRING
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  }
});

module.exports = OrderItem;
