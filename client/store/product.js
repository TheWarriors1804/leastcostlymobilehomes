import axios from 'axios'

/**
 * ACTION TYPES
 */

const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'

/**
 * INITIAL STATE
 */

const initialProducts = []

/**
 * ACTION CREATORS
 */

const gotProducts = products => ({type: GET_ALL_PRODUCTS, products})

/**
 * THUNK CREATORS
 */

export const getProducts = () => async dispatch => {
  const {data} = await axios.get(`/api/products`)
  dispatch(gotProducts(data))
}

/**
 * REDUCER
 */

export default function(state = initialProducts, action) {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return action.products
    default:
      return state
  }
}
