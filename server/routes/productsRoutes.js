const express = require('express');
const productsController = require('../controllers/productsController');

const router = express.Router();

// Retrieves the list of products
router.get('/products', productsController.getProducts);

// Returns all product level information for a specified product id
router.get('/products/:product_id', productsController.getProductById);

// Returns the all styles available for the given product
router.get('/products/:product_id/styles', productsController.getStylesById);

// Returns the id's of products related to the product specified
router.get('/products/:product_id/related', productsController.getRelatedById);

module.exports = router;