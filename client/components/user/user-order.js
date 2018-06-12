import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {HomeUserInfo, HomeTitle, HomeContent} from '../index'

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
  return {
    // firstName: state.order.firstName,
    // lastName: state.order.lastName,
    imageUrl: state.user.imageUrl
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
