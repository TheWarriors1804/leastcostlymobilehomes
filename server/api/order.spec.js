// const { expect } = require('chai');
// const request = require('supertest');
// const db = require('../db');
// const app = require('../index');
// const Order = db.model('order');
// const User = db.model('user')

// describe('Order routes', () => {
//   beforeEach(() => {
//     db.sync({force: true})
//   })

//   describe('/api/orders', () => {

//     beforeEach(() => {
//       return Order.create({
//         complete: true,
//       })
//     })

//     it('GET /api/orders', () => {
//       return request(app)
//         .get('/api/orders')
//         .expect(200)
//         .then(res => {
//           expect(res.body).to.be.an('array')
//           const complete = res.body[0].complete
//           expect(complete.to.be.equal(true))
//         })
//     })

//   });

// //   describe('/api/orders/:userid', () => {
// //     beforeEach(() => {
// //       User.bulkCreate([
// //         {firstName: 'Dolores',
// //         lastName: 'Abernathy',
// //         email: 'test1@westworld.com'},
// //         {firstName: 'Teddy',
// //         lastName: 'Flood',
// //         email: 'test2@westworld.com'}
// //       ])
// //       // .then(() => Order.bulkCreate([
// //       //   {userId: 2, complete: true},
// //       //   {userId: 1, complete: false},
// //       //   {userId: 1, complete: true}]))
// //     })

// //     it('GET /api/orders/1', () => {
// //       return request(app)
// //         .get('/api/orders/1')
// //         .expect(200)
// //         .then(res => {
// //           console.log('newres', res.body)
// //           expect(res.body).to.be.an('array');
// //           expect(res.body.length).to.be.equal(2)
// //           const complete = res.body[1].complete
// //           expect(complete.to.be.equal(true))
// //         })
// //     })
// //   })
// })
