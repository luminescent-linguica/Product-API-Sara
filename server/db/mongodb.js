const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mongodbForProducts', { useNewUrlParser: true, useUnifiedTopology: true });

const productSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: Number,
  related: [Number],
  features: [{
    feature: String,
    value: String
  }]
});

const styleSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  name: String,
  sale_price: Number,
  original_price: Number,
  default_style: Number,
  photos: [{
    thumbnail_url: String,
    url: String
  }],
  skus: [{
    quantity: Number,
    size: String
  }]
});

const Product = mongoose.model('Product', productSchema);
const Style = mongoose.model('Style', styleSchema);

module.exports = {
  Product,
  Style
};