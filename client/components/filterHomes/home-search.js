import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {HomeSearchCard} from '../index'

/**
 * COMPONENT
 */
export const HomeSearch = props => {
  const state = {
    bedrooms: 3,
    bathrooms: 1,
    imageUrl:
      'https://mhdirect-inboundhorizonsi.netdna-ssl.com/wp-content/uploads/2016/05/Manufactured-ABSOLUTE-VALUE-38SLT28764AH-20170309-1224356555225.jpg',
    year: 2014,
    manufacturer: 'Bob Builder',
    model: 'STU-845CX',
    price: 85750.0,
    id: 1
  }

  return (
    <div>
      {/* <HomeSearchCard info={state} /> */}
      {'bob'}
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    info: state.products
  }
}

export default connect(mapState)(HomeSearch)

/**
 * PROP TYPES
 */
// SingleHome.propTypes = {
//   email: PropTypes.string
// };
