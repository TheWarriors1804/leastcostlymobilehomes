import {Link} from 'react-router-dom'
import React from 'react'
import {HomeSearchCard} from './index'
import {connect} from 'react-redux'

const CheckOut = props => {
  console.log('order', props.order)
  console.log('products', props.products)
  const orderTotal =
    Object.keys(props.order).length && props.products.length
      ? Object.keys(props.order).reduce((acc, productId) => {
          const product = props.products.find(
            currProd => Number(productId) === currProd.id
          )
          console.log('prod', product)
          return acc + product.price * props.order[productId]
        }, 0)
      : 0

  const formatPrice = price =>
    Number(price).toLocaleString('en', {
      style: 'currency',
      currency: 'USD'
    })

  const tax = 0.08875

  return (
    <div>
      <div className="flexContainer">
        <div className="checkout-text">
          <h1>Shopping Cart</h1>
          <h2>
            {`You have `}
            {Object.keys(props.order).reduce(
              (acc, curr) => acc + props.order[curr],
              0
            )}
            {` items in your shopping cart.`}
          </h2>
        </div>
        <div>
          <Link to="/checkout/checkoutForm">
            <button
              type="submit"
              className="btn waves-effect waves-light green"
              onClick={element => console.log(element)}
            >
              Proceed with your order
            </button>
          </Link>
        </div>
      </div>

      <div className="checkout-summary row">
        <div className="col s12 m10">
          <div className="card blue-grey">
            <div className="card-content">
              <span className="card-title">Order Summary</span>
              <div className="white-text">
                <div>Subtotal: {formatPrice(orderTotal)}</div>
                <div>Tax: {tax * 100}%</div>
                <div>Shipping: FREE</div>
                <div>Total: {formatPrice(orderTotal * (1 + tax))}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>View or modify order</div>
      <div className="checkout-orders">
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
    </div>
  )
}

const mapStateToProps = state => ({
  order: {'2': 1, '3': 2},
  products: state.product
})

export default connect(mapStateToProps)(CheckOut)
