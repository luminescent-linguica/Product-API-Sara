const pool = require('../db/postgresql');

module.exports = {
  getAllProducts: async (page, count, callback) => {
    const getProductsQuery = `
      SELECT *, p.default_price::text
      FROM product p
      WHERE id > $1
      ORDER BY id
      LIMIT $2;
    `;

    try {
      const client = await pool.connect();
      const result = await client.query(getProductsQuery, [count * (page - 1), count]);
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
      WHERE p.id = $1
      GROUP BY p.id;
    `;

    try {
      const client = await pool.connect();
      const result = await client.query(getProductByIdQuery, [id]);
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
      FROM styles s
      LEFT JOIN photos ph ON s.id = ph.styleId
      LEFT JOIN skus sk ON s.id = sk.styleId
      WHERE s.productid = $1
      GROUP BY s.id;
    `;

    try {
      const client = await pool.connect();
      const result = await client.query(getStylesByIdQuery, [id]);
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
      WHERE r.current_product_id = $1
      ORDER BY r.id;
    `;

    try {
      const client = await pool.connect();
      const result = await client.query(getRelatedByIdQuery, [id]);
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