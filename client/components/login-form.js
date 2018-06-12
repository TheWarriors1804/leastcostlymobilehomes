import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import {fetchCartFromLocalStorage} from '../store/order'

/**
 * COMPONENT
 */

class AuthForm extends Component {
  constructor() {
    super()
    this.state = {
      cart: {}
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit(evt) {
    evt.preventDefault()
    this.setState({
      cart: this.props.cart
    })
    const formName = evt.target.name
    const email = evt.target.email.value
    const password = evt.target.password.value
    this.props.auth(email, password, formName, this.props.cart)
  }

  handleChange(evt) {
    this.props.getCart()
  }

  render() {
    const {name, displayName, error} = this.props
    return (
      <div>
        <form onSubmit={this.handleSubmit} name={name}>
          <div className="row">
            <div className="input-field col s10 m5">
              <label htmlFor="email">
                <small>Email</small>
              </label>
              <input name="email" type="text" onChange={this.handleChange} />
            </div>
          </div>
          <div className="row">
            <div className="input-field col s10 m5">
              <label htmlFor="password">
                <small>Password</small>
              </label>
              <input name="password" type="password" />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="btn waves-effect waves-light green"
            >
              {displayName}
            </button>
          </div>
          {error && error.response && <div> {error.response.data} </div>}
        </form>
        <a href="/auth/google">
          <img
            className="google-btn"
            src="http://www.setyourowntests.com/_/rsrc/1468869481521/help/accounts/btn_google_signin_dark_normal_web%402x.png"
          />
        </a>
      </div>
    )
  }
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapState = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error,
    cart: state.order
  }
}

const mapDispatch = dispatch => {
  return {
    auth: (email, password, formName, cart) =>
      dispatch(auth(email, password, formName, cart)),
    getCart: async () => await dispatch(fetchCartFromLocalStorage())
  }
}

export default connect(mapState, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  // handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
