const express = require('express');
const { placeOrder, payOrder } = require('../Control/orderController')
const router = express.Router();

router.post('/', placeOrder);
router.put('/:id/pay', payOrder);

module.exports = router;
