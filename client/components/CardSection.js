import React from 'react'
import {CardElement, injectStripe, StripeElement} from 'react-stripe-elements'
import {connect} from 'react-redux'
import axios from 'axios'

class CardSection extends React.Component {
  handleSubmit = async ev => {
    ev.preventDefault()
    const createToken = await this.props.stripe.createToken({
      type: 'card'
    })
    console.log('hit', createToken)
    const newRoute = await axios.post('/api/stripe', {
      token: createToken.token.id
    })
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
      </div>
    )
  }
}

const mapStateToProps = state => ({
  order: state.order,
  products: state.product
})

export default connect(mapStateToProps)(injectStripe(CardSection))
