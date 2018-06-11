import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {UserInfo, UserOrder, UserEdit} from '../index'

/**
 * COMPONENT
 */
export class UserHome extends Component {
  state = {
    editing: false,
    user: {
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      address2: '',
      city: '',
      state: '',
      zip: ''
    }
  }

  componentDidMount = () => {
    //const user = this.props.user
    console.log('before', this.props.user)
    this.setState({
      user: this.props.user
    })
    console.log('after', this.state)
  }

  onSubmit = user => {
    this.setState(prevState => ({
      editing: !prevState.editing,
      user
    }))
  }

  render() {
    const {editing, user} = this.state

    const userInfo = editing ? (
      <UserEdit onSubmit={this.onSubmit} user={user} />
    ) : (
      <UserInfo onSubmit={this.onSubmit} />
    )
    const {firstName, lastName, imageUrl} = this.props
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
          <div className="card horizontal col s11 m11 l11">
            <UserOrder />
          </div>
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => ({
  updateUser: user => dispatch(updateUser(user))
})

export default connect(mapState, mapDispatchToProps)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  imageUrl: PropTypes.string
}
