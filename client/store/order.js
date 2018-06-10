import axios from 'axios'

const ADD_ITEM = 'ADD_ITEM'
const FETCH_CART = 'FETCH_CART'
const COMPLETE_PURCHASE = 'COMPLETE_PURCHASE'

//add quantities for add item

const completedPurchase = () => ({type: COMPLETE_PURCHASE})
const addedItem = (productId, quantity) => ({type: ADD_ITEM, productId, quantity})
const fetchedCart = cart => ({type: FETCH_CART, cart})

export const addItemLoggedIn = (
  userId,
  productId,
  quantity
) => async dispatch => {
  await axios.post(`api/orders/${userId}/${productId}`, {quantity})
  dispatch(addedItem(productId, quantity))
}

export const addItemGuest = (productId, quantity) => dispatch => {
  console.log('entered addItemGuest', productId, quantity, localStorage)
  localStorage.setItem(productId, quantity)
  dispatch(addedItem(productId, quantity))
  console.log('cart is', localStorage)
}

// console.log('localStorage updates to:', localStorage)
// dispatch(addedItem(productId, quantity))

export const completePurchaseLoggedIn = userId => async dispatch => {
  await axios.put(`api/orders/${userId}`)
  dispatch(completedPurchase())
}

export const completePurchaseGuest = (session, products) => async dispatch => {
  await axios.post(`api/orders`, {session, products})
  dispatch(completedPurchase())
}

export const fetchCartFromLocalStorage = () => dispatch => {
  const cart = localStorage
  delete cart['loglevel:webpack-dev-server']
  // const cart = localStorage
  const newcart = {}
  for (const key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      newcart[key] = localStorage[key]
    }
  }
  console.log('newcart',newcart)
  dispatch(fetchedCart(newcart))
  console.log('localstorage in fetching cart from storage is:,', cart)
}

export const fetchCartFromDb = userId => async dispatch => {
  const cart = await axios.get(`api/orders/cart/${userId}`)
  //the route above needs to output productId: quantity as keyvalues in an object
  dispatch(fetchedCart(cart))
}

const initialState = {}
//Store will have array of key-value pairs representing the item id and quantity

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
    default:
      return state
  }
}
