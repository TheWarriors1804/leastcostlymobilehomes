import axios from 'axios'
import history from '../history'
import order from './order'

/**
 * ACTION TYPES
 */

const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const UPDATE_USER = 'UPDATE_USER'
const FETCH_HISTORY = 'FETCH_HISTORY'

/**
 * INITIAL STATE
 */

const defaultUser = {}

/**
 * ACTION CREATORS
 */

const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const updatedUser = user => ({type: UPDATE_USER, user})
const fetchedHistory = orderHistory => ({type: FETCH_HISTORY, orderHistory})

/**
 * THUNK CREATORS
 */

export const me = () => async dispatch =>
  await axios
    .get('/auth/me')
    .then(res => dispatch(getUser(res.data || defaultUser)))
    .catch(err => console.log(err))

//thunk for login and signup
export const auth = (email, password, method, cart) => {
  return dispatch =>
    axios
      .post(`/auth/${method}`, {email, password, cart})
      .then(
        res => {
          dispatch(getUser(res.data))
          localStorage.clear()
          history.push('/home')
        },
        authError => {
          // rare example: a good use case for parallel (non-catch) error handler
          dispatch(getUser({error: authError}))
        }
      )
      .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))
}

export const logout = () => dispatch =>
  axios
    .post('/auth/logout')
    .then(_ => {
      dispatch(removeUser())
      history.push('/login')
    })
    .catch(err => console.log(err))

export const updateUser = user => async dispatch => {
  const res = await axios.put(`/api/users/${user.id}`, user)
  dispatch(updatedUser(res.data))
}

export const deleteUser = user => async dispatch => {
  await axios.delete(`/api/users/${user}`)
  dispatch(removeUser())
}

export const fetchOrderHistory = userId => async dispatch => {
  console.log('in fetch order history thunk')
  const orderHistory = await axios.get(`/api/orders/${userId}`)
  let final = {}
  if (orderHistory.data[0]) {
    orderHistory.data.forEach(async order => {
      const orderItems = {}
      const orderProducts = order.products
      if (orderProducts[0]) {
        orderProducts.forEach(item => {
          orderItems[item.id] = item.orderItem.quantity
        })
      }
      final[order.id] = {orderItems, orderDate: order.purchaseDate}
    })
  }
  dispatch(fetchedHistory(final))
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    case UPDATE_USER:
      return action.user
    case FETCH_HISTORY:
      return {
        ...state,
        orderHistory: action.orderHistory
      }
    default:
      return state
  }
}
