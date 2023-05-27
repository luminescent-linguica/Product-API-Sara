const request = require('supertest');
const app = require('../server/index.js');

describe('GET /products, return all the products( default 5 )', () => {
  it('Should return 200 when no query', (done) => {
    request(app)
      .get('/products')
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });

  it('Should return 200 when query is assigned', (done) => {
    request(app)
      .get('/products?page=2&count=10')
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });


  it('Should return 500 when invalid query is assigned', (done) => {
    request(app)
      .get('/products?page=1&count=a')
      .expect(500)
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });

  it('Should get a products array with length of 5 by defalut', () => request(app)
    .get('/products')
    .then((response) => {
      expect(response.body.length).toEqual(5);
    }));
});

describe('GET products/333, return the specified product which product_id is 333', () => {
  it('Should return 200', (done) => {
    request(app)
      .get('/products/333')
      .expect(200, done);
  });

  it('Invalid format product_id should return 500', (done) => {
    jest.spyOn(console, 'log').mockImplementation(() => { });
    request(app)
      .get('/products/a')
      .expect(500, () => {
        console.log.mockRestore();
        done();
      });
  });

  it('Should get the product and the id match 333', () => request(app)
    .get('/products/333')
    .then((response) => {
      expect(response.body[0].id).toEqual(333);
    }));
});

describe('GET /products/12345, return all the styles of product which product_id is 12345', () => {
  it('Should return 200', (done) => {
    request(app)
      .get('/products/12345/styles')
      .expect(200, done);
  });

  it('Invalid format product_id should return 500', (done) => {
    jest.spyOn(console, 'log').mockImplementation(() => { });
    request(app)
      .get('/products/a/styles')
      .expect(500, () => {
        console.log.mockRestore();
        done();
      });
  });

  it('Should get the styles and the first style_id is 24352', () => request(app)
    .get('/products/12345/styles')
    .then((response) => {
      expect(response.body.product_id).toEqual('12345');
      expect(response.body.results[0].style_id).toEqual(24352);
    }));

  it('should get the styles and results is an array', () => request(app)
    .get('/products/12345/styles')
    .then((response) => {
      expect(Array.isArray(response.body.results)).toBeTruthy();
    }));
});

describe('GET /products/8888/related, return all the related product_id of product which product_id is 8888', () => {
  it('Should return 200', (done) => {
    request(app)
      .get('/products/8888/related')
      .expect(200, done);
  });

  it('Invalid format product_id should return 500', (done) => {
    jest.spyOn(console, 'log').mockImplementation(() => { });
    request(app)
      .get('/products/a/related')
      .expect(500, () => {
        console.log.mockRestore();
        done();
      });
  });

  it('Should get an array of related product_id', () => request(app)
    .get('/products/8888/related')
    .then((response) => {
      expect(response.body).toEqual([8875, 4043, 106]);
    }));
});