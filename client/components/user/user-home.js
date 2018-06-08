import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {UserInfo} from '../index'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {firstName, lastName, imageUrl} = props

  return (
    <div>
      <h3>
        Welcome, {firstName} {lastName}!
        <div className="row">
          <div className="card horizontal col s11 m11 l11">
            <div className="card-image">
              <img src={imageUrl} />
            </div>
            <div className="card-content">
              <UserInfo />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="card horizontal col s10 m10 l10">
            <h3> Previous Orders </h3>
          </div>
        </div>
      </h3>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    firstName: state.user.firstName,
    lastName: state.user.lastName,
    imageUrl: state.user.imageUrl
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  imageUrl: PropTypes.string
}
