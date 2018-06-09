import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {HomeTitle, HomeInfo, HomeContent} from '../index'

/**
 * COMPONENT
 */
export const UserOrder = props => {
  const handleSubmit = () => {}
  const current = props.products
    ? props.products.find(product => {
        return product.id === +props.match.params.id
      })
    : []
  if (current) {
    return (
      <div>
        <HomeTitle info={current} />
        <div className="flexContainer">
          <img src={current.imageUrl} className="homeImage" />
          <HomeInfo info={current} handleSubmit={handleSubmit} />
        </div>
        <HomeContent info={current} />
      </div>
    )
  } else {
    return <div />
  }
}

/**
 * CONTAINER
 */
const mapStateToProps = state => {
  return {
    userId: state.user.userId,
    productId: state.user.productId,
    quantity: state.user.quantity
  }
}

export default connect(mapStateToProps)(UserOrder)

/**
 * PROP TYPES
 */
UserOrder.propTypes = {
  userId: PropTypes.string,
  productId: PropTypes.string,
  quantity: PropTypes.string
}
