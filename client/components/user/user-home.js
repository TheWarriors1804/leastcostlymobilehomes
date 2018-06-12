import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {UserInfo, UserOrder, UserEdit} from '../index'
import {updateUser} from '../../store/user'
import {fetchOrderHistory} from '../../store'

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
    if (this.props.fetchOrderHistory) {
      this.props.fetchOrderHistory(this.props.user.id)
    }
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

    await this.props.updateUser(this.state.user)
  }

  handleEdit = () => {
    this.setState(prevState => ({
      editing: !prevState.editing
    }))
  }

  render() {
    const orderHistoryExists = this.props.user.orderHistory
      ? !!Object.keys(this.props.user.orderHistory).length
      : false

    const sortedOrders = orderHistoryExists
      ? Object.keys(this.props.user.orderHistory).sort((a, b) => b - a)
      : null

    const {editing, user} = this.state
    const {firstName, lastName, imageUrl} = user

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
    return (
      <div>
        <h3 className="montserrat-text greeting">
          Welcome{`, ${firstName}`} {lastName}!
        </h3>
        <div className="row">
          <div className="card horizontal col s12 m10 l10 offset-m1 offset-l1">
            <div className="card-image">
              <img src={imageUrl} />
            </div>
            <div className="card-content">{userInfo}</div>
          </div>
        </div>

        {orderHistoryExists ? (
          sortedOrders.map(orderId => (
            <div className="row" key={orderId}>
              <div className="card horizontal col s12 m10 l10 offset-m1 offset-l1">
                <UserOrder
                  orderId={orderId}
                  orderDate={this.props.user.orderHistory[orderId].orderDate}
                  orderItems={this.props.user.orderHistory[orderId].orderItems}
                />
              </div>
            </div>
          ))
        ) : (
          <div className="row">
            <div className="col s12 m10 l10 offset-m1 offset-l1 montserrat-text no-orders-text">
              No Previous Orders
            </div>
          </div>
        )}
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
  updateUser: user => dispatch(updateUser(user)),
  fetchOrderHistory: userId => dispatch(fetchOrderHistory(userId))
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
