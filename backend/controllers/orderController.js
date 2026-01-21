const orderService = require('../services/orderService');

exports.placeOrder = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const order = await orderService.placeOrder(productId, quantity);

    res.status(201).json({
      message: 'Order placed successfully.',
      order
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || 'Unable to place order. Please verify the request data and try again.'
    });
  }
};