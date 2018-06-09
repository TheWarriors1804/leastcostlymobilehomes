import React from 'react'
import {connect} from 'react-redux'

export const HomePage = props => {
  return (
    <div>
      <div className="homepage-container">
        <h1>Welcome to Least Costly Mobile Homes Direct!</h1>
        <h2>
          Your source for the highest quality and least costly mobile homes
        </h2>
      </div>
    </div>
  )
}

const mapState = state => {
  return {
    products: state.product
  }
}

export default connect(mapState)(HomePage)
