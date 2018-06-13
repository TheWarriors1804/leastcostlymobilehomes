/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')

describe('Initial user tests', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  // describe('/api/users/', () => {
  //   const codysEmail = 'cody@puppybook.com'

  //   beforeEach(() => {
  //     return User.create({
  //       firstName: 'cody',
  //       lastName: 'bones',
  //       email: codysEmail
  //     })
  //   })

  it('GET /api/users', () => {
    return request(app)
      .get('/api/users')
      .expect(200)
      .then(res => {
        expect(res.body).to.be.an('array')
        expect(res.body[0].email).to.be.equal(codysEmail)
      })
  })
})
describe('/api/users/', () => {
  const doloresEmail = 'dolores@westworld.com'
  beforeEach(() => {
    return User.create({
      firstName: 'Dolores',
      lastName: 'Abernathy',
      email: doloresEmail
    })
  })

  it('GET /api/users', () => {
    return request(app)
      .get('/api/users')
      .expect(200)
      .then(res => {
        expect(res.body).to.be.an('array')
        expect(res.body[0].email).to.be.equal(doloresEmail)
      })
  })
})

describe('/api/users/:id', () => {
  const teddyEmail = 'teddy@westworld.com'
  beforeEach(() => {
    return User.create({
      firstName: 'Teddy',
      lastName: 'Flood',
      email: teddyEmail
    })
  })

  it('GET /api/users/:id', () => {
    return request(app)
      .get('/api/users/1')
      .expect(200)
      .then(res => {
        expect(res.body).to.be.an('object')
        expect(res.body.email).to.be.equal(teddyEmail)
      })
  })
})
describe('User GET User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/', () => {
    const doloresEmail = 'dolores@westworld.com'
    beforeEach(() => {
      return User.create({
        firstName: 'Dolores',
        lastName: 'Abernathy',
        email: doloresEmail
      })
    })

    it('GET /api/users', () => {
      return request(app)
        .get('/api/users')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].email).to.be.equal(doloresEmail)
        })
    })
  }) // end describe('/api/users')

  describe('/api/users/:id', () => {
    const teddyEmail = 'teddy@westworld.com'
    beforeEach(() => {
      return User.create({
        firstName: 'Teddy',
        lastName: 'Flood',
        email: teddyEmail
      })
    })

    it('GET /api/users/:id', () => {
      return request(app)
        .get('/api/users/1')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.email).to.be.equal(teddyEmail)
        })
    })
  })
}) // end describe('User routes')
// })
