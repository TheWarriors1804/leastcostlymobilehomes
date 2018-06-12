import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {UserInfo, UserOrder, UserEdit} from '../index'
import {updateUser} from '../../store/user'

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

  handleSubmit = async event => {
    event.preventDefault()
    this.handleEdit()

    const update = await this.props.updateUser(this.state.user)
    console.log('update: ', update)
  }

  handleEdit = () => {
    this.setState(prevState => ({
      editing: !prevState.editing
    }))
  }

  render() {
    const {editing, user} = this.state

    if (!this.props.user) {
      return <h3>Loading User Info...</h3>
    }

    const userInfo = editing ? (
      <UserEdit
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        user={user}
      />
    ) : (
      <UserInfo handleEdit={this.handleEdit} user={user} />
    )
    const {firstName, lastName, imageUrl} = this.state.user
    return (
      <div>
        <h3>
          Welcome, {firstName} {lastName}!
        </h3>
        <div className="row">
          <div className="card horizontal col s10 m10 l10">
            <div className="card-image">
              <img src={imageUrl} />
            </div>
            <div className="card-content">{userInfo}</div>
          </div>
        </div>
        <div className="row">
          <div className="card horizontal col s10 m10 l10 teal lighten-5">
            <UserOrder orderId={3} orderItems={{'2': 1, '3': 3, '4': 1}} />
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
