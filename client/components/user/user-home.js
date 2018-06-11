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
    this.setState({
      user: this.props.user
    })
  }

  handleChange = event => {
    const id = event.target.id
    const value = event.target.value

    this.setState({
      user: {
        ...this.state.user,
        [id]: value
      }
    })
  }

  handleSubmit = () => {
    this.setState(prevState => ({
      editing: !prevState.editing
    }))
  }

  render() {
    const {editing, user} = this.state

    console.log(this.state)

    const userInfo = editing ? (
      <UserEdit
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        user={user}
      />
    ) : (
      <UserInfo handleSubmit={this.handleSubmit} />
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
