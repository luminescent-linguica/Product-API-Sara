-- Drop old tables
DROP TABLE IF EXISTS skus, photos, styles, feature, related, product;

-- Create table schemas
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