import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {HomeSearchCard} from '../index'

/**
 * COMPONENT
 */
export const UserOrder = props => {
  return (
    <div>
      <h1>ORDER NO. {props.orderId}</h1>
      {Object.keys(props.orderItems).length && props.products.length ? (
        <div className="order-card-container">
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

/**
 * PROP TYPES
 */
// UserOrder.propTypes = {
//   firstName: PropTypes.string,
//   lastName: PropTypes.string,
//   imageUrl: PropTypes.string
// }
