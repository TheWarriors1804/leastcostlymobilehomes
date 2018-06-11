import axios from 'axios'

const FETCH_HISTORY = 'FETCH_HISTORY'

const fetchedOrders = orders => ({type: FETCH_HISTORY, orders})

export const fetchOrderHistory = userId => async dispatch => {
  const {data} = await axios.get(`/api/orders/${userId}/all`)
  dispatch(fetchedOrders(data))
}

const initialState = []

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_HISTORY: {
      return action.orders
    }
    default:
      return state
  }
}
