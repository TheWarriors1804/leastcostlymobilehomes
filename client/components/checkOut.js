import {Link} from 'react-dom'
import React from 'react'
import {HomeSearchCard} from './index'
import {connect} from 'react-redux'

const CheckOut = props => {
  console.log('order', props.order)
  console.log('products', props.products)
  return (
    <div>
      <h1>Shopping Cart</h1>
      <h2>
        You have{' '}
        {Object.keys(props.order).reduce(
          (acc, curr) => acc + props.order[curr],
          0
        )}{' '}
        items in your shopping cart.
      </h2>
      {Object.keys(props.order).length && props.products.length ? (
        Object.keys(props.order).map(productId => (
          <HomeSearchCard
            product={props.products.find(
              product => product.id === Number(productId)
            )}
            key={productId}
            quantity={props.order[productId]}
          />
        ))
      ) : (
        <div />
      )}
    </div>
  )
}

const mapStateToProps = state => ({
  // order: state.order,
  order: {'2': 1, '3': 2},
  products: state.product
})

export default connect(mapStateToProps)(CheckOut)
