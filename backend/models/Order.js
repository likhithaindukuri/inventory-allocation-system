const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Order = sequelize.define('Order', {
  productId: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  quantity: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  status: {
    allowNull: false,
    type: DataTypes.STRING
  }
});

module.exports = Order;