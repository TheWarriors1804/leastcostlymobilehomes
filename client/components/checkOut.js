import {Link} from 'react-dom'
import React from 'react'
import {HomeSearchCard} from './index'
import {connect} from 'react-redux'
import {fetchCartFromDb, fetchCartFromLocalStorage} from '../store/order'

class CheckOut extends React.Component {
  componentDidMount() {
    this.props.user.id
      ? this.props.fetchCartFromDb(this.props.user.id)
      : this.props.fetchCartFromLocalStorage()
  }

  render() {
    const orderTotal =
      Object.keys(this.props.order).length && this.props.products.length
        ? Object.keys(this.props.order).reduce((acc, productId) => {
            const product = this.props.products.find(
              currProd => Number(productId) === currProd.id
            )
            return acc + product.price * this.props.order[productId]
          }, 0)
        : 0

    const formatPrice = price =>
      Number(price).toLocaleString('en', {
        style: 'currency',
        currency: 'USD'
      })

    const tax = 0.08875

    console.log('user', this.props.user, this.props.user.id)
    console.log('localStorage', localStorage)
    console.log('props', this.props)

    return (
      <div>
        <div className="flexContainer">
          <div className="checkout-text">
            <h1>Shopping Cart</h1>
            <h2>
              {`You have `}
              {Object.keys(this.props.order).reduce(
                (acc, curr) => acc + this.props.order[curr],
                0
              )}
              {` items in your shopping cart.`}
            </h2>
          </div>
          <button
            type="submit"
            className="btn waves-effect waves-light green"
            onClick={event => console.log(event)}
          >
            Proceed with your order
          </button>
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

        <div>
          <h2>View or modify order</h2>
        </div>
        <div className="checkout-orders">
          {Object.keys(this.props.order).length &&
          this.props.products.length ? (
            Object.keys(this.props.order).map(productId => (
              <HomeSearchCard
                product={this.props.products.find(
                  product => product.id === Number(productId)
                )}
                key={productId}
                quantity={this.props.order[productId]}
              />
            ))
          ) : (
            <div />
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  order: state.order,
  products: state.product
})

const mapDispatchToProps = dispatch => ({
  fetchCartFromDb: userId => dispatch(fetchCartFromDb(userId)),
  fetchCartFromLocalStorage: () => dispatch(fetchCartFromLocalStorage())
})

export default connect(mapStateToProps, mapDispatchToProps)(CheckOut)
