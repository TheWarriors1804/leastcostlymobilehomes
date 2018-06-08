import React from 'react'
import {connect} from 'react-redux'
import {auth} from '../store'

const SignupForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>
        <div className="row">
          <div className="input-field col s12 m6">
            <label htmlFor="email">
              <small>Email</small>
              <span className="red-text"> **</span>
            </label>
            <input className="validate" name="email" type="text" />
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12 m6">
            <label htmlFor="password">
              <small>Password</small>
              <span className="red-text"> **</span>
            </label>
            <input name="password" type="password" />
          </div>
        </div>
        <div>
          <button type="submit" className="btn waves-effect waves-light green">
            {displayName}
          </button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
        <div>
          <small>
            <span className="red-text">**</span> denotes required fields
          </small>
        </div>
      </form>
    </div>
  )
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const firstName = evt.target.firstName.value
      const lastName = evt.target.lastName.value
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName, firstName, lastName))
    }
  }
}

export default connect(mapSignup, mapDispatch)(SignupForm)
