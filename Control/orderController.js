const Order = require('../Model/orderModel');

// Place an order
exports.placeOrder = async (req, res) => {
  const { products, totalPrice } = req.body;
  const order = new Order({
    user: req.user._id,
    products,
    totalPrice,
  });

  const createdOrder = await order.save();
  res.status(201).json(createdOrder);
};

// Dummy payment
exports.payOrder = async (req, res) => {
  const { id } = req.params;
  const order = await Order.findById(id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    const paidOrder = await order.save();
    res.json(paidOrder);
  } else {
    res.status(404).json({ message: 'Order not found' });
  }
};
