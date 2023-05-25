const pool = require('../db/postgresql');

module.exports = {

  combineAllTables: async (callback) => {
    const combineTablesQuery = `
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
  `;

    try {
      const client = await pool.connect();
      // Execute the combine tables query
      const result = await client.query(combineTablesQuery);
      callback(null, result);
      client.release();
    } catch (err) {
      console.log('Error combining tables: ', err);
      callback(err, null);
    }
  }
};