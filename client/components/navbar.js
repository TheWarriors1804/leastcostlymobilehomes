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
        <Link to="/singleHome">
          <p className="navButton">Shop for Homes</p>
        </Link>
        <h2 />
        <nav>
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
            </div>
          )}
        </nav>
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

export default connect(mapState, mapDispatch)(Navbar);

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
