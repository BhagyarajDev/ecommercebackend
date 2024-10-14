const Product = require('../Model/ProductModel');

// Get all products
exports.getProducts = async (req, res) => {
  const products = await Product.find({});
  res.json(products);
};

// Add product
exports.addProduct = async (req, res) => {
  const { name, description, price, countInStock } = req.body;
  const product = new Product({ name, description, price, countInStock });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
};

// Update product
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, countInStock } = req.body;

  const product = await Product.findById(id);
  if (product) {
    product.name = name;
    product.description = description;
    product.price = price;
    product.countInStock = countInStock;
    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (product) {
    await product.remove();
    res.json({ message: 'Product removed' });
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
};
