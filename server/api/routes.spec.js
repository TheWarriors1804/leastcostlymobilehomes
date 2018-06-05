/* global describe beforeEach it */

const { expect } = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
const User = db.model('user');
const Product = db.model('product')

describe('User GET User routes', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe('/api/users/', () => {
    const doloresEmail = 'dolores@westworld.com'
    beforeEach(() => {
      return User.create({
        firstName: 'Dolores',
        lastName: 'Abernathy',
        email: doloresEmail
      });
    });

    it('GET /api/users', () => {
      return request(app)
        .get('/api/users')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array');
          expect(res.body[0].email).to.be.equal(doloresEmail);
        });
    });
  }); // end describe('/api/users')

  describe('/api/users/:id', () => {
    const teddyEmail = 'teddy@westworld.com'
    beforeEach(() => {
      return User.create({
        firstName: 'Teddy',
        lastName: 'Flood',
        email: teddyEmail
      });
    });

    it('GET /api/users/:id', () => {
      return request(app)
        .get('/api/users/1')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object');
          expect(res.body.email).to.be.equal(teddyEmail);
        });
    });
  });



}); // end describe('User routes')


describe('User GET Product Routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('GET /api/products', () => {
    const price1 = 500.99
    beforeEach(() => {
      return Product.create({
        price: price1,
        model: 'XXXX'
      })
    })

    it('GET /api/products', () => {
      return request(app)
        .get('/api/products')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array');
          console.log('console.log', res.body)
          expect(res.body[0].price).to.be.equal('500.99')
        })
    })

  });

  describe('GET /api/products/:id', () => {
    beforeEach(() => {
      return Product.bulkCreate([{
        price: 99.99,
        model: 'X01'
      }, {price: 100.50, model: 'X02'}])
    })

    it('GET /api/products/1', () => {
      return request(app)
        .get('/api/products/1')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object');
          expect(res.body.price).to.be.equal('99.99')
        })
    })

    it('GET /api/products/2', () => {
      return request(app)
        .get('/api/products/2')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object');
          expect(res.body.price).to.be.equal('100.50')
        })
    })

  })

})
