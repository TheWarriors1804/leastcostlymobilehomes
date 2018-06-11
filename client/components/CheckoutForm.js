import React from 'react'
import {injectedStripe} from 'react-stripe-elements'

import CardSection from './CardSection'

class CheckoutForm extends React.Component {
  handleSubmit = ev => {
    ev.preventDefault()

    this.props.stripe.createToken({name: 'Jesse Sullivan'}).then(({token}) => {
      console.log('Recieved Stripe token:', token)
    })
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <CardSection />
        <button type="button">Confirm order</button>
      </form>
    )
  }
}

export default injectedStripe(CheckoutForm)
