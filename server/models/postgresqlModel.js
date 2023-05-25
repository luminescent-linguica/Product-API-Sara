const pool = require('../db/postgresql');

// Drop old tables
const dropTablesQuery = `
 DROP TABLE IF EXISTS skus, photos, styles, feature, related, product;
`;

// Create table schemas
const createTablesQuery = `
 CREATE TABLE IF NOT EXISTS product (
   id INT PRIMARY KEY,
   name VARCHAR(255),
   slogan VARCHAR(255),
   description TEXT,
   category VARCHAR(100),
   default_price INT
 );

 CREATE TABLE IF NOT EXISTS related (
   id INT PRIMARY KEY,
   current_product_id INT,
   related_product_id INT,
   FOREIGN KEY (current_product_id) REFERENCES product(id)
 );

 CREATE TABLE IF NOT EXISTS feature (
   id INT PRIMARY KEY,
   product_id INT,
   feature VARCHAR(100),
   value VARCHAR(100) NULL,
   FOREIGN KEY (product_id) REFERENCES product(id)
 );

 CREATE TABLE IF NOT EXISTS styles (
   id INT PRIMARY KEY,
   productId INT,
   name VARCHAR(255),
   sale_price INT NULL,
   original_price INT,
   default_style INT,
   FOREIGN KEY (productId) REFERENCES product(id)
 );

 CREATE TABLE IF NOT EXISTS photos (
   id INT PRIMARY KEY,
   styleId INT,
   thumbnail_url TEXT,
   url TEXT,
   FOREIGN KEY (styleId) REFERENCES styles(id)
 );

 CREATE TABLE IF NOT EXISTS skus (
   id INT PRIMARY KEY,
   styleId INT,
   size VARCHAR(10),
   quantity INT,
   FOREIGN KEY (styleId) REFERENCES styles(id)
 );
`;

// Transfer the full application data set to database
const copyQuery = `
COPY product(id, name, slogan, description, category, default_price)
FROM '/Users/sara/RFP2303/Products-API/data/product.csv' DELIMITER ',' CSV HEADER;

COPY related(id,current_product_id,related_product_id)
FROM '/Users/sara/RFP2303/Products-API/data/related.csv' DELIMITER ',' CSV HEADER;

COPY feature(id,product_id,feature,value)
FROM '/Users/sara/RFP2303/Products-API/data/features.csv' DELIMITER ',' CSV NULL 'null' HEADER;

COPY styles(id,productId,name,sale_price,original_price,default_style)
FROM '/Users/sara/RFP2303/Products-API/data/styles.csv' DELIMITER ',' CSV NULL 'null' HEADER;

COPY photos(id,styleId,url,thumbnail_url)
FROM '/Users/sara/RFP2303/Products-API/data/photos.csv' DELIMITER ',' CSV HEADER;

COPY skus(id,styleId,size,quantity)
FROM '/Users/sara/RFP2303/Products-API/data/skus.csv' DELIMITER ',' CSV HEADER;
`;

module.exports = {
  connectPgDatabase: async () => {
    try {
      const client = await pool.connect();
      // Execute the drop tables query
      await client.query(dropTablesQuery);
      // Execute the create tables query
      await client.query(createTablesQuery);
      // Transfer the full application data set into database
      await client.query(copyQuery);
      client.release();
      console.log('Data copied successfully');
    } catch (err) {
      console.log('Error connecting to pg db: ', err);
    }
  },

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