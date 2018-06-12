import React from 'react'
import {CardElement, injectStripe} from 'react-stripe-elements'
import axios from 'axios'

class CardSection extends React.Component {
  handleSubmit = async ev => {
    ev.preventDefault()
    const createToken = await this.props.stripe.createToken({
      type: 'card'
    })
    console.log('hit', createToken)
    const newRoute = await axios.post('/api/stripe', {
      token: createToken.token.id
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <CardElement />
          <button type="submit">Confirm order</button>
        </form>
      </div>
    )
  }
}

export default injectStripe(CardSection)
