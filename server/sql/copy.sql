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