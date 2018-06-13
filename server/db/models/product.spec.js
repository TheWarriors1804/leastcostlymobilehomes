/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Product = db.model('product')

describe('Product model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('product', () => {
    describe('hasLocation', () => {
      let puppytown
      beforeEach(() => {
        return Product.create({
          location: 'puppytown',
          length: '50',
          width: '20',
          price: '1500.00'
        }).then(product => {
          puppytown = product
        })
      })

      it('returns true if the location is correct', () => {
        expect(puppytown.location).to.equal('puppytown')
      })

      it('returns false if the location is incorrect', () => {
        expect(puppytown.location).to.not.equal('puppyton')
      })
    }) // end describe('Location')
  })
}) // end describe('Product model')
