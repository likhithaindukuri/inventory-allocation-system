const Product = require('../models/Product');

class ProductRepository {
  async findById(id, transaction = null) {
    return await Product.findByPk(id, { transaction });
  }

  async updateStock(id, newStock, transaction) {
    return await Product.update(
      { stock: newStock },
      {
        transaction,
        where: { id }
      }
    );
  }
}

module.exports = new ProductRepository();