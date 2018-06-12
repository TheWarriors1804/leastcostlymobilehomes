import React from 'react'
import {CardElement, injectStripe} from 'react-stripe-elements'
import axios from 'axios'
import Confirmation from './confirmation'
import {connect} from 'react-redux'
import {
  completePurchaseGuest,
  completePurchaseLoggedIn,
  fetchCartFromLocalStorage
} from '../store/order'
import {withRouter} from 'react-router-dom'

class CardSection extends React.Component {
  constructor() {
    super()
    this.state = {
      result: ''
    }
  }

  handleSubmit = async ev => {
    ev.preventDefault()
    if (!this.props.user.id) {
      this.props.fetchCartFromLocalStorage()
    }
    const createToken = await this.props.stripe.createToken({
      type: 'card'
    })
    console.log('hit', createToken)
    const newRoute = await axios.post('/api/stripe', {
      token: createToken.token.id
    })
    console.log('new route is', newRoute)
    if (newRoute.data === 'declined') {
      this.setState({result: 'fail'})
    }
    if (newRoute.data === 'accepted') {
      this.props.user.id
        ? this.props.completePurchaseLoggedIn(
            this.props.user.id,
            this.props.history
          )
        : this.props.completePurchaseGuest(this.props.cart, this.props.history)
    }
  }

  render() {
    console.log('the history is:', this.props)
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <CardElement />
          <button type="submit">Confirm order</button>
        </form>
        {this.state.result === 'fail' ? (
          <div>Uh oh! Your card has been declined, please check and retry.</div>
        ) : (
          <div />
        )}
      </div>
    )
  }
}

const mapState = (state, ownProps) => {
  return {
    cart: state.order,
    user: state.user,
    history: ownProps.history
  }
}

const mapDispatch = (dispatch, ownProps) => {
  console.log('OWNPROPS IS: ', ownProps)
  return {
    completePurchaseGuest: (cart, history) =>
      dispatch(completePurchaseGuest(cart, history)),
    completePurchaseLoggedIn: (userId, history) =>
      dispatch(completePurchaseLoggedIn(userId, history)),
    fetchCartFromLocalStorage: () => dispatch(fetchCartFromLocalStorage())
  }
}

export default withRouter(
  connect(mapState, mapDispatch)(injectStripe(CardSection))
)
