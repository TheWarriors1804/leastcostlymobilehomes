import axios from 'axios'

/**
 * ACTION TYPES
 */

const ADD_ITEM = 'ADD_ITEM'
const FETCH_CART = 'FETCH_CART'
const COMPLETE_PURCHASE = 'COMPLETE_PURCHASE'
const REMOVE_ITEM = 'REMOVE_ITEM'

/**
 * INITIAL STATE
 */

const initialState = {}

/**
 * ACTION CREATORS
 */

const completedPurchase = () => ({type: COMPLETE_PURCHASE})
const addedItem = (productId, quantity) => ({
  type: ADD_ITEM,
  productId,
  quantity
})
const fetchedCart = cart => ({type: FETCH_CART, cart})
const removeItem = productId => ({type: REMOVE_ITEM, productId})

/**
 * THUNK CREATORS
 */

export const addItemLoggedIn = (
  userId,
  productId,
  quantity
) => async dispatch => {
  await axios.post(`/api/orders/${userId}/${productId}`, {quantity})
  dispatch(addedItem(productId, quantity))
}

export const addItemGuest = (productId, quantity) => dispatch => {
  localStorage.setItem(productId, quantity)
  dispatch(addedItem(productId, quantity))
}

export const removeItemGuest = productId => dispatch => {
  localStorage.removeItem(productId)
  dispatch(removeItem(productId))
}

export const removeItemLoggedIn = (productId, userId) => async dispatch => {
  await axios.delete(`/api/orders/${userId}/${productId}`)
  dispatch(removeItem(productId))
}

export const completePurchaseLoggedIn = userId => async dispatch => {
  await axios.put(`/api/orders/${userId}`)
  dispatch(completedPurchase())
}

export const completePurchaseGuest = (session, products) => async dispatch => {
  await axios.post(`/api/orders`, {session, products})
  dispatch(completedPurchase())
}

export const fetchCartFromLocalStorage = () => dispatch => {
  const cart = localStorage
  delete cart['loglevel:webpack-dev-server']
  const newcart = {}
  for (const key in localStorage) {
    if (
      localStorage.hasOwnProperty(key) &&
      key !== '__stripe-js-v3-features__'
    ) {
      newcart[key] = localStorage[key]
    }
  }
  dispatch(fetchedCart(newcart))
}

export const fetchCartFromDb = userId => async dispatch => {
  const {data} = await axios.get(`/api/orders/cart/${userId}`)
  dispatch(fetchedCart(data))
}

/**
 * REDUCER
 */

export default function(state = initialState, action) {
  switch (action.type) {
    case COMPLETE_PURCHASE: {
      return initialState
    }
    case ADD_ITEM: {
      return {
        ...state,
        [action.productId]: action.quantity
      }
    }
    case FETCH_CART: {
      return action.cart
    }
    case REMOVE_ITEM: {
      let updated = {}
      for (var key in state) {
        if (key != action.productId) {
          updated[key] = state[key]
        }
      }
      return {
        ...updated
      }
    }
    default:
      return state
  }
}
