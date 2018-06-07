import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div>
    <div className="navDiv">
      <div className="navTitle navSpace">
        <img src="Logo.png" className="navImg" />
      </div>
      <div className="flexContainer">
        <p className="navButton">Home</p>
        <Link to="/HomeSearch">
          <p className="navButton">Shop for Homes</p>
        </Link>
        <Link to="/singleHome">
          <p className="navButton">View Home</p>
        </Link>
        <h2 />
        <div>
          {isLoggedIn ? (
            <div>
              {/* The navbar will show these links after you log in */}
              <Link to="/user-home">Profile</Link>
              <a href="#" onClick={handleClick}>
                Logout
              </a>
            </div>
          ) : (
            <div>
              {/* The navbar will show these links before you log in */}
              <Link to="/login" className="navButton navButtonSmall">
                Login
              </Link>
              <Link to="/signup" className="navButton navButtonSmall">
                Sign Up
              </Link>
              <Link to="/checkout">
                <img
                  className="cart"
                  src="https://cdn3.iconfinder.com/data/icons/shopping-2/256/Add_to_Cart-512.png"
                />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
    <div className="navSpace" />
  </div>
);

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  };
};

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout());
    }
  };
};

export default connect(
  mapState,
  mapDispatch
)(Navbar);

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
