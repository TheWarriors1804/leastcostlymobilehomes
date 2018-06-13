import React from 'react'
import {connect} from 'react-redux'
import {HomeSearchCard} from '../index'

/**
 * COMPONENT
 */
export const UserOrder = props => {
  return (
    <div className="checkout-text order-card-container">
      <h1>ORDER NO. {props.orderId}</h1>
      <h2>Placed {Date(props.orderDate)}</h2>
      {Object.keys(props.orderItems).length && props.products.length ? (
        <div>
          {Object.keys(props.orderItems).map(productId => (
            <HomeSearchCard
              product={props.products.find(
                product => product.id === Number(productId)
              )}
              key={productId}
              quantity={props.orderItems[productId]}
              complete={true}
            />
          ))}
        </div>
      ) : (
        <div />
      )}
    </div>
  )
}

/**
 * CONTAINER
 */
const mapStateToProps = state => {
  return {
    products: state.product
  }
}

export default connect(mapStateToProps)(UserOrder)
