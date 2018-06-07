import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {HomeInfo, HomeTitle, HomeContent} from '../index'
import {HomeInfo, HomeTitle, HomeContent} from '../../index'

/**
 * COMPONENT
 */
export const SingleHome = props => {
  //const {info} = props
  const state = {
    bedrooms: 3,
    bathrooms: 1,
    type: 'Tiny Home',
    length: 84,
    year: 2014,
    location: 'Jacksonville, Florida',
    manufacturer: 'Bob Builder',
    model: 'STU-845CX',
    description:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    price: 85750.0,
    imageUrl:
      'https://static1.squarespace.com/static/556def68e4b0fb59709c7d04/59f7cf8c0d92972b61a51365/59f7dd146926704f35548f70/1509901300163/DSCF4735.jpg?format=1500w'
  }

  const handleSubmit = () => {
    console.log('submitted here')
  }

  return (
    <div>
      <HomeTitle info={state} />
      <div className="flexContainer">
        <img src={state.imageUrl} className="homeImage" />
        <HomeInfo info={state} handleSubmit={handleSubmit} />
      </div>
      <HomeContent info={state} />
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

export default connect(mapState)(SingleHome)

/**
 * PROP TYPES
 */
SingleHome.propTypes = {
  email: PropTypes.string
}
