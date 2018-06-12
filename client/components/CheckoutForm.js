import React from 'react'
import {Elements} from 'react-stripe-elements'
import CardSection from './CardSection'

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Elements>
        <CardSection />
      </Elements>
    )
  }
}

// function mapStateToProducts(state) {
//   return {
//     order: {'2': 1, '3': 2},
//     products: state.product
//   }
// }

export default CheckoutForm
