const postgresqlModel = require('../models/postgresqlModel');

module.exports = {
  getProducts: (req, res) => {
    postgresqlModel.getAllProducts((err, result) => {
      if(err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        res.status(200).send(result.rows);
      }
    });
  },
  //   req.params: { product_id: '333' }
  getProductById: (req, res) => {
    postgresqlModel.getProductById(req.params.product_id, (err, result) => {
      if(err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        res.status(200).send(result.rows);
      }
    });
  },

  getStylesById: (req, res) => {
    postgresqlModel.getStylesById(req.params.product_id, (err, result) => {
      if(err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        res.status(200).send(result);
      }
    });
  },

  getRelatedById: (req, res) => {
    postgresqlModel.getRelatedById(req.params.product_id, (err, result) => {
      if(err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        res.status(200).send(result);
      }
    });
  },
}