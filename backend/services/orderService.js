const sequelize = require('../models');
const Product = require('../models/Product');
const orderRepository = require('../repositories/orderRepository');
const productRepository = require('../repositories/productRepository');

class OrderService {
  async placeOrder(productId, quantity) {
    return await sequelize.transaction(async (transaction) => {
      // Lock product row (SELECT ... FOR UPDATE)
      const product = await Product.findByPk(productId, {
        lock: transaction.LOCK.UPDATE,
        transaction
      });

      // Validate product exists
      if (!product) {
        throw new Error('Product not found. Please create the product before placing an order.');
      }

      // Validate stock
      if (product.stock < quantity) {
        throw new Error('Insufficient stock. Reduce the order quantity or restock the product and try again.');
      }

      // Deduct stock (using repository to touch DB)
      const updatedStock = product.stock - quantity;
      await productRepository.updateStock(productId, updatedStock, transaction);

      // Create order (DB write via repository)
      const order = await orderRepository.create(
        {
          productId,
          quantity,
          status: 'SUCCESS'
        },
        transaction
      );

      // Return order from within the same transaction
      return order;
    });
  }
}

module.exports = new OrderService();