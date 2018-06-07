import React from 'react'
import {connect} from 'react-redux'
import {auth} from '../store'

const SignupForm = (props) => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>
        <div className="row">
          <div className="input-field col s12 m3">
            <label htmlFor="firstName"><small>First Name</small><span className="red-text"> **</span></label>
            <input name="firstName" type="text" />
          </div>
          <div className="input-field col s12 m3">
            <label htmlFor="lastName"><small>Last Name</small><span className="red-text"> **</span></label>
            <input name="lastName" type="text" />
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12 m6">
            <label htmlFor="email"><small>Email</small><span className="red-text"> **</span></label>
            <input name="email" type="text" />
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12 m6">
            <label htmlFor="phone"><small>Phone Number</small></label>
            <input name="phone" type="text" />
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12 m6">
            <label htmlFor="address"><small>Address</small></label>
            <input name="address" type="text" />
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12 m6">
            <label htmlFor="password"><small>Password</small><span className="red-text"> **</span></label>
            <input name="password" type="password" />
          </div>
        </div>
        <div>
          <button type="submit" className="btn waves-effect waves-light green">{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
        <div><small><span className="red-text">**</span> denotes required fields</small></div>
      </form>
    </div>
  )
}

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit (evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export default connect(mapSignup, mapDispatch)(SignupForm)
