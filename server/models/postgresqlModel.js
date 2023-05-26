const pool = require('../db/postgresql');
/*
      SELECT p.id AS id, p.name, p.slogan, p.description, p.category, p.default_price,
             r.related_product_id,
             f.feature, f.value,
             s.id  AS style_id, s.name, s.sale_price, s.original_price, s.default_style,
             ph.thumbnail_url, ph.url,
             sk.size, sk.quantity
      FROM product p
      LEFT JOIN related r ON p.id = r.current_product_id
      LEFT JOIN feature f ON p.id = f.product_id
      LEFT JOIN styles s ON p.id = s.productId
      LEFT JOIN photos ph ON s.id = ph.styleId
      LEFT JOIN skus sk ON s.id = sk.styleId
      ORDER BY p.id, r.id, f.id, s.id, ph.id, sk.id;
*/
module.exports = {

  getAllProducts: async (callback) => {
    const getFirstFiveProductQuery = `
      SELECT *
      FROM product
      ORDER BY id
      LIMIT 5;
    `;

    try {
      const client = await pool.connect();
      const result = await client.query(getFirstFiveProductQuery);
      callback(null, result);
      client.release();
    } catch (err) {
      console.log('Error in getAllProducts: ', err);
      callback(err, null);
    }
  },

  getProductById: async (id, callback) => {
    const getProductByIdQuery = `
      SELECT p.id AS product_id, p.name, p.slogan, p.description, p.category, p.default_price,
             jsonb_agg(jsonb_build_object('feature', f.feature, 'value', f.value)) AS features
      FROM product p
      LEFT JOIN feature f ON p.id = f.product_id
      WHERE p.id = ${id}
      GROUP BY p.id;
    `;

    try {
      const client = await pool.connect();
      const result = await client.query(getProductByIdQuery);
      callback(null, result);
      client.release();
    } catch (err) {
      console.log('Error in getAllProducts: ', err);
      callback(err, null);
    }
  },
};