import React from 'react'
import {CardElement, injectStripe, StripeElement} from 'react-stripe-elements'
import {connect} from 'react-redux'
import axios from 'axios'
import Confirmation from './confirmation'
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
        : this.props.completePurchaseGuest(this.props.order, this.props.history)
    }
  }

  render() {
    const {products, order} = this.props
    const orderKeys = Object.keys(order)

    let orderNew = orderKeys.map(orderItem =>
      products.find(ele => Number(ele.id) == orderItem)
    )

    const formatPrice = price =>
      Number(price).toLocaleString('en', {
        style: 'currency',
        currency: 'USD'
      })

    const orderTotal =
      orderKeys.length && products.length
        ? orderKeys.reduce((acc, productId) => {
            const product = products.find(
              currProd => Number(productId) === currProd.id
            )
            return acc + product.price * order[productId]
          }, 0)
        : 0

    const style = {
      base: {
        color: '#32325d',
        lineHeight: '18px',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    }

    return (
      <div>
        <div className="orderItemsBox">
          <h3 className="orderInfoTitle">Order Info</h3>
          {orderNew.map(ele => (
            <div key={ele.id} className="flexContainer orderInfo">
              <p className="orderInfoItem">
                {ele.model + ' -   Quantaty: ' + order[ele.id] + '    '}
              </p>
              {formatPrice(ele.price)}
            </div>
          ))}
          <div className="flexContainer orderInfo total">
            <p className="orderInfoItem">Total: </p>
            {formatPrice(orderTotal)}
          </div>
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className="stripeCheckout">
            <label>
              <span>Card</span>
              <CardElement className={StripeElement} style={style} />
            </label>
          </div>
          <button className="waves-effect waves-light btn" type="submit">
            Confirm order
          </button>
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
    order: state.order,
    user: state.user,
    history: ownProps.history,
    products: state.product
  }
}

const mapDispatch = (dispatch, ownProps) => {
  console.log('OWNPROPS IS: ', ownProps)
  return {
    completePurchaseGuest: (order, history) =>
      dispatch(completePurchaseGuest(order, history)),
    completePurchaseLoggedIn: (userId, history) =>
      dispatch(completePurchaseLoggedIn(userId, history)),
    fetchCartFromLocalStorage: () => dispatch(fetchCartFromLocalStorage())
  }
}

export default withRouter(
  connect(mapState, mapDispatch)(injectStripe(CardSection))
)

