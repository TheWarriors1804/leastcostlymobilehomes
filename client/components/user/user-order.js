import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {HomeUserInfo, HomeTitle, HomeContent} from '../index'

/**
 * COMPONENT
 */
export const UserOrder = props => {
  const handleSubmit = () => {}
  console.log('here:', props.products[0])
  const current = props.products.orders
    ? props.products.orders.find(product => {
        return product.orders === +props.match.params.orders
      })
    : []
  if (current) {
    const prodObj = props.products.id
    console.log('inside:', prodObj)
    return (
      <div>
        <HomeTitle info={current} />
        <div className="flexContainer">
          <img src={current.imageUrl} className="homeImage" />
          <HomeUserInfo info={current} handleSubmit={handleSubmit} />
        </div>
        <HomeContent info={current} />
      </div>
    )
  } else {
    return (
      <div>
        <h2>No previous orders</h2>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapStateToProps = state => {
  // console.log('state product:', state.product[0].id)
  console.log('state:', state.product.id)
  return {
    // productId: state.user.order.products.id,
    // lastName: state.order.lastName,
    // imageUrl: state.user.imageUrl,
    products: state.product
  }
}

export default connect(mapStateToProps)(UserOrder)

/**
 * PROP TYPES
 */
UserOrder.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  imageUrl: PropTypes.string
}
