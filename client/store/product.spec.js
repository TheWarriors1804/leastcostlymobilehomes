/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {getProducts} from './product'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {initialProducts: []}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('getProducts', () => {
    it('eventually dispatches the GET ALL PRODUCTS action', () => {
      const fakeProduct = {model: 'The Ironclad'}
      mockAxios.onGet('/api/products').replyOnce(200, fakeProduct)
      return store.dispatch(getProducts()).then(() => {
        const actions = store.getActions()
        expect(actions[0].type).to.be.equal('GET_ALL_PRODUCTS')
        expect(actions[0].fakeProduct).to.be.deep.equal(fakeProduct)
      })
    })
  })

  //   describe('logout', () => {
  //     it('logout: eventually dispatches the REMOVE_USER action', () => {
  //       mockAxios.onPost('/auth/logout').replyOnce(204)
  //       return store.dispatch(logout()).then(() => {
  //         const actions = store.getActions()
  //         expect(actions[0].type).to.be.equal('REMOVE_USER')
  //         expect(history.location.pathname).to.be.equal('/login')
  //       })
  //     })
  //   })
})
