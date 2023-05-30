const postgresqlModel = require('../models/postgresqlModel');

module.exports = {
  getProducts: (req, res) => {
    let page = req.query.page ? Number(req.query.page) : 1;
    let count = req.query.count ? Number(req.query.count) : 5;
    if (page < 0 || count < 0) { count = 0; }
    postgresqlModel.getAllProducts(page, count, (err, result) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        res.status(200).send(result.rows);
      }
    });
  },

  getProductById: (req, res) => {
    postgresqlModel.getProductById(req.params.product_id, (err, result) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        res.status(200).send(result.rows);
      }
    });
  },

  getStylesById: (req, res) => {
    postgresqlModel.getStylesById(req.params.product_id, (err, result) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        res.status(200).send(result);
      }
    });
  },

  getRelatedById: (req, res) => {
    postgresqlModel.getRelatedById(req.params.product_id, (err, result) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        res.status(200).send(result);
      }
    });
  },
}