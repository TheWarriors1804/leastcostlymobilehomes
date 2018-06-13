import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {HomeInfo, HomeTitle, HomeContent} from '../index'

/**
 * COMPONENT
 */
export const SingleHome = props => {
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
        <div className="flexContainer homeMain">
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
const mapState = state => {
  return {
    products: state.product
  }
}

export default connect(mapState)(SingleHome)

/**
 * PROP TYPES
 */
SingleHome.propTypes = {
  email: PropTypes.string
}
