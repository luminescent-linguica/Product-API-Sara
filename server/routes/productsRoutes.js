const express = require('express');
const productsController = require('../controllers/productsController');

const router = express.Router();

router.get('/products', productsController.getProducts);
router.get('/products/:product_id', productsController.getProductById);
router.get('/products/:product_id/styles', productsController.getStylesById);
router.get('/products/:product_id/related', productsController.getRelatedById);

module.exports = router;