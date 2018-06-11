import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn, order}) => {
  const orderNum = Object.keys(order).reduce(
    (acc, curr) => acc + Number(order[curr]),
    0
  )

  return (
    <div>
      <div className="navDiv">
        <div className="navTitle navSpace">
          <Link to="/">
            <img src="/Logo.png" className="navImg" />
          </Link>
        </div>
        <div className="flexContainer">
          <Link to="/" className="navButton">
            Home
          </Link>
          <Link to="/homeSearch">
            <p className="navButton">Shop for Homes</p>
          </Link>
          <h2 />
          <div className="">
            {isLoggedIn ? (
              <div>
                {/* The navbar will show these links after you log in */}
                <Link to="/home" className="navButton navButtonSmall">
                  Profile
                </Link>
                <a
                  href="#"
                  className="navButton navButtonSmall"
                  onClick={handleClick}
                >
                  Logout
                </a>
              </div>
            ) : (
              <div className="flexCenter">
                {/* The navbar will show these links before you log in */}
                <Link to="/login" className="navButton navButtonSmall">
                  Login
                </Link>
                <Link to="/signup" className="navButton navButtonSmall">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
          <Link to="/checkout" className="valign-wrapper">
            <img className="cartIcon" src="/cart.png" />
            <span className="new badge" data-badge-caption="items in cart">
              {orderNum}
            </span>
          </Link>
        </div>
      </div>
      <div className="navSpace" />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => ({
  isLoggedIn: !!state.user.id,
  order: state.order
})

const mapDispatch = dispatch => ({
  handleClick: () => dispatch(logout())
})

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
