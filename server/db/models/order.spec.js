/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Order = db.model('order')

describe('Order model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('order', () => {
    describe('hasStatus', () => {
      let pupper
      beforeEach(() => {
        return Order.create({
          complete: 'false',
          initiatedDate: '2018-01-01',
          purchaseDate: '2018-02-01'
        }).then(order => {
          pupper = order
        })
      })

      it('returns if there is a status', () => {
        expect(pupper.complete).to.equal(false)
      })
    }) // end describe('Status')
  })
}) // end describe('Order model')
