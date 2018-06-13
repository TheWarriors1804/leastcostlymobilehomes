import React from 'react'
import {Elements} from 'react-stripe-elements'
import CardSection from './CardSection'

const CheckoutForm = props => {
  return (
    <Elements>
      <CardSection products={props.products} order={props.order} />
    </Elements>
  )
}

export default CheckoutForm
