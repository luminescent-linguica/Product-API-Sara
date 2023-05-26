const pool = require('../db/postgresql');

module.exports = {
  getAllProducts: async (callback) => {
    const getFirstFiveProductQuery = `
      SELECT *, p.default_price::text
      FROM product p
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
      SELECT p.id AS id, p.name, p.slogan, p.description, p.category, p.default_price::text,
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
      console.log('Error in getProductById: ', err);
      callback(err, null);
    }
  },

  getStylesById: async (id, callback) => {
    const getStylesByIdQuery = `
      SELECT s.id AS style_id, s.name, s.sale_price, s.original_price::text, s.default_style::boolean AS "default?",
             jsonb_agg(DISTINCT jsonb_build_object('thumbnail_url', ph.thumbnail_url, 'url', ph.url)) AS photos,
             jsonb_object_agg(sk.id, jsonb_build_object('quantity', sk.quantity, 'size', sk.size)) AS skus
      FROM product p
      LEFT JOIN styles s ON p.id = s.productId
      LEFT JOIN photos ph ON s.id = ph.styleId
      LEFT JOIN skus sk ON s.id = sk.styleId
      WHERE p.id = ${id}
      GROUP BY p.id, s.id
      ORDER BY s.id;
    `;

    try {
      const client = await pool.connect();
      const result = await client.query(getStylesByIdQuery);
      const obj = {};
      obj['product_id'] = id;
      obj['results'] = result.rows;
      callback(null, obj);
      client.release();
    } catch (err) {
      console.log('Error in getStylesById: ', err);
      callback(err, null);
    }
  },

  getRelatedById: async (id, callback) => {
    const getRelatedByIdQuery = `
      SELECT r.related_product_id
      FROM related r
      WHERE r.current_product_id = ${id}
      ORDER BY r.id;
    `;

    try {
      const client = await pool.connect();
      const result = await client.query(getRelatedByIdQuery);
      let arr = [];
      for (let item of result.rows) {
        arr.push(item["related_product_id"]);
      }
      callback(null, arr);
      client.release();
    } catch (err) {
      console.log('Error in getRelatedById: ', err);
      callback(err, null);
    }
  },
};