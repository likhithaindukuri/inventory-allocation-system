const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Product = sequelize.define('Product', {
  name: {
    allowNull: false,
    type: DataTypes.STRING
  },
  stock: {
    allowNull: false,
    type: DataTypes.INTEGER
  }
});

module.exports = Product;