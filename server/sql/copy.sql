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

CREATE INDEX idx_product_id ON product (id);
CREATE INDEX idx_related_current_product_id ON related (current_product_id);
CREATE INDEX idx_feature_product_id ON feature (product_id);
CREATE INDEX idx_styles_productid ON styles (productId);
CREATE INDEX idx_photos_styleId ON photos (styleId);
CREATE INDEX idx_skus_styleId ON skus (styleId);