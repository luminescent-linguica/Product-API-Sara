const request = require('supertest');
const app = require('../server/index.js');

describe('GET /products, return all the products( default 5 )', () => {
  it('should return 200', (done) => {
    request(app)
      .get('/products')
      .expect(200, done);
  });

  it('should get a products array with length of 5 by defalut', () => request(app)
    .get('/products')
    .then((response) => {
      expect(response.body.length).toEqual(5);
    }));
});

describe('GET products/333, return the specified product which product_id is 333', () => {
  it('should return 200', (done) => {
    request(app)
      .get('/products/333')
      .expect(200, done);
  });

  it('should return 500', (done) => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
    request(app)
      .get('/products/a')
      .expect(500, () => {
        console.log.mockRestore();
        done();
      });
  });

  it('should get the product and the id match 333', () => request(app)
    .get('/products/333')
    .then((response) => {
      expect(response.body[0].id).toEqual(333);
    }));
});