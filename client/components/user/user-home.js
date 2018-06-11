import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {UserInfo, UserOrder, UserEdit} from '../index'
import {updateUser} from '../../store/user'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {firstName, lastName, imageUrl} = props
  let editing = true

  const onEdit = () => {
    console.log('clicked', editing)
    props.updateUser(props.user)
    editing = true
  }

  const onSubmit = () => {
    console.log('clicked', editing)
    props.updateUser(props.user)
    editing = false
  }

  const userInfo = editing ? (
    <UserEdit onSubmit={onSubmit} />
  ) : (
    <UserInfo onEdit={onEdit} />
  )

  return (
    <div>
      <h3>
        Welcome, {firstName} {lastName}!
      </h3>
      <div className="row">
        <div className="card horizontal col s11 m11 l11">
          <div className="card-image">
            <img src={imageUrl} />
          </div>
          <div className="card-content">{userInfo}</div>
        </div>
      </div>
      <div className="row">
        <div className="card horizontal col s10 m10 l10">
          <UserOrder />
        </div>
      </div>
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
    imageUrl: state.user.imageUrl,
    user: state.user
  }
}

const dispatch = dispatch => {
  return {
    updateUser: user => dispatch(updateUser(user))
  }
}

export default withRouter(connect(mapState, dispatch)(UserHome))

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  imageUrl: PropTypes.string
}
