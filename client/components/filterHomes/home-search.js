import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {HomeSearchCard} from '../index'
import {Link} from 'react-router-dom'
/**
 * COMPONENT
 */
export const HomeSearch = props => {
  return (
    <div>
      {console.log(props.product)}
      {props.product.map(oneProduct => (
        <HomeSearchCard product={oneProduct} key={oneProduct.id} />
      ))}
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    product: state.product
  }
}

export default connect(mapState)(HomeSearch)

/**
 * PROP TYPES
 */
// SingleHome.propTypes = {
//   email: PropTypes.string
// };
