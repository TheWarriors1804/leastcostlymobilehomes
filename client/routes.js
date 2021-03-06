import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  SingleHome,
  HomeSearch,
  HomePage,
  CheckOut,
  Confirmation
} from './components'
import CheckoutForm from './components/cart/CheckoutForm'

import {
  me,
  getProducts,
  fetchCartFromDb,
  fetchCartFromLocalStorage,
  fetchOrderHistory
} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  async componentDidMount() {
    await this.props.loadInitialData()
    this.props.user.id
      ? this.props.fetchCartFromDb(this.props.user.id)
      : this.props.fetchCartFromLocalStorage()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.user.id !== nextProps.user.id) {
      nextProps.user.id
        ? this.props.fetchCartFromDb(nextProps.user.id)
        : this.props.fetchCartFromLocalStorage()
    }
  }

  render() {
    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/" exact component={HomePage} />
        {/* <Route path="/userHome" exact component={UserHome} /> */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/singleHome/:id" component={SingleHome} />
        <Route path="/homeSearch" component={HomeSearch} />
        <Route path="/checkout" exact component={CheckOut} />
        <Route path="/checkout/checkoutForm" component={CheckoutForm} />
        <Route path="/confirmation" component={Confirmation} />
        {/* Routes placed below are only available after logging in */}
        {this.props.isLoggedIn && (
          <Switch>
            <Route path="/home" component={UserHome} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    order: state.order,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData: () => {
      dispatch(me())
      dispatch(getProducts())
    },
    fetchCartFromDb: userId => dispatch(fetchCartFromDb(userId)),
    fetchCartFromLocalStorage: () => dispatch(fetchCartFromLocalStorage()),
    fetchOrderHistory: userId => dispatch(fetchOrderHistory(userId))
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
