import React from 'react'
import {Link} from 'react-router-dom'

const CartHeader = props => {
  const {orderNum, orderKeys} = props

  return (
    <div className="checkout-container row valign-wrapper">
      <div className="checkout-text col s12 m6 offset-m1">
        <h1>SHOPPING CART</h1>
        <h2>
          {`You have `}
          {orderNum}
          {` ${orderNum === 1 ? `item` : `items`} in your shopping cart.`}
        </h2>
      </div>
      {orderKeys[0] ? (
        <Link to="/checkout/checkoutForm">
          <button type="submit" className="btn waves-effect waves-light green">
            Proceed with your order
          </button>
        </Link>
      ) : (
        <div />
      )}
    </div>
  )
}

export default CartHeader
