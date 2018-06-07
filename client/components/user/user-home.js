import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

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
          <div className="card horizontal col s10 m10 l10">
            <div className="card-image">
              <img src={imageUrl} />
            </div>
          </div>

          <div>{/* <UserInfo /> */}</div>
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
