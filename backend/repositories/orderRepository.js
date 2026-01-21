const Order = require('../models/Order');

class OrderRepository {
  async create(orderData, transaction) {
    return await Order.create(orderData, { transaction });
  }
}

module.exports = new OrderRepository();