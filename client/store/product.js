import axios from 'axios'
import history from '../history'

const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'

const initialProducts = []

const gotProducts = products => ({type: GET_ALL_PRODUCTS, products})

export const getProducts = () => async dispatch => {
  const allProducts = await axios.get(`api/products`)
  dispatch(gotProducts(allProducts))
}

export default function(state = initialProducts, action) {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return action.products
    default:
      return state
  }
}
