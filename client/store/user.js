import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const UPDATE_USER = 'UPDATE_USER'

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

/**
 * THUNK CREATORS
 */
export const me = () => dispatch =>
  axios
    .get('/auth/me')
    .then(res => dispatch(getUser(res.data || defaultUser)))
    .catch(err => console.log(err))

//thunk for login
export const auth = (email, password, method, firstName, lastName) => {
  const cart = localStorage
  // console.log('localStorage', localStorage)
  return dispatch =>
    axios
      .post(`/auth/${method}`, {email, password})
      .then(
        res => {
          dispatch(getUser(res.data))
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
  const updated = await axios.put(`/api/users`, user)
  dispatch(updatedUser(updated))
}

export const deleteUser = id => async dispatch => {
  await axios.delete(`/api/users/${id}`)
  dispatch(removeUser())
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
      return action.updated
    default:
      return state
  }
}
