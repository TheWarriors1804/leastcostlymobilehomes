import React from 'react'
import {connect} from 'react-redux'

const UserEdit = props => {
  const {
    firstName,
    lastName,
    email,
    address,
    address2,
    city,
    state,
    zip
  } = props.user

  const handleChange = props.handleChange

  return (
    <div className="row userInfo" onChange={handleChange}>
      <form className="col s12">
        <div className="row">
          <div className="input-field col s6">
            <label htmlFor="firstName" className="active">
              First Name
            </label>
            <input
              onChange={handleChange}
              value={firstName}
              id="firstName"
              type="text"
              className="validate"
            />
          </div>
          <div className="input-field col s6">
            <label htmlFor="lastName" className="active">
              Last Name
            </label>
            <input
              onChange={handleChange}
              value={lastName}
              id="lastName"
              type="text"
              className="validate"
            />
          </div>
        </div>
        <div className="row">
          <div className="input-field col s6">
            <label htmlFor="email" className="active">
              Email
            </label>
            <input
              onChange={handleChange}
              value={email}
              id="email"
              type="text"
              className="validate"
            />
          </div>
        </div>
        <div className="row">
          <div className="input-field col s6">
            <label htmlFor="address1" className="active">
              Address 1
            </label>
            <input
              onChange={handleChange}
              value={address}
              id="address"
              type="text"
              className="validate"
            />
          </div>
          <div className="input-field col s6">
            <label htmlFor="address2" className="active">
              Address 2
            </label>
            <input
              onChange={handleChange}
              value={address2}
              id="address2"
              type="text"
              className="validate"
            />
          </div>
        </div>
        <div className="row">
          <div className="input-field col s6">
            <label htmlFor="city" className="active">
              Town / City
            </label>
            <input
              onChange={handleChange}
              value={city}
              id="city"
              type="text"
              className="validate"
            />
          </div>
        </div>
        <div className="row">
          <div className="input-field col s6">
            <label htmlFor="state" className="active">
              State
            </label>
            <input
              onChange={handleChange}
              value={state}
              id="state"
              type="text"
              className="validate"
            />
          </div>
          <div className="input-field col s6">
            <label htmlFor="zip" className="active">
              Zip Code
            </label>
            <input
              onChange={handleChange}
              value={zip}
              id="zip"
              type="text"
              className="validate"
            />
          </div>
        </div>
        <div className="row">
          <a href="delete the user" className="col s6 delete">
            Delete this user
          </a>
          <button
            type="button"
            className="btn waves-effect waves-light col s4"
            onClick={props.handleSubmit}
          >
            Submit Changes
          </button>
        </div>
      </form>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    //user: state.user
  }
}

export default connect(mapStateToProps)(UserEdit)
