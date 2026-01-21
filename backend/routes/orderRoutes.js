const express = require('express');
const orderController = require('../controllers/orderController');

const router = express.Router();

// ONLY ONE API
router.post('/order', orderController.placeOrder);

module.exports = router;