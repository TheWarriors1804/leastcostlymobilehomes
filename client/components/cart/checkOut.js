import React from 'react'
import {HomeSearchCard, CartHeader} from '../index'
import {connect} from 'react-redux'
import {fetchOrderHistory} from '../../store/user'

class CheckOut extends React.Component {
  componentDidMount() {
    const user = this.props.user
    if (user.id) {
      this.props.fetchOrderHistory(user.id)
    }
  }

  orderTotal = (order, products, orderKeys) =>
    orderKeys.length && products.length
      ? orderKeys.reduce((acc, productId) => {
          const product = products.find(
            currProd => Number(productId) === currProd.id
          )
          return acc + product.price * order[productId]
        }, 0)
      : 0

  formatPrice = price =>
    Number(price).toLocaleString('en', {
      style: 'currency',
      currency: 'USD'
    })

  render() {
    const order = this.props.order
    const products = this.props.products
    const orderKeys = Object.keys(order)

    const orderNum = orderKeys.reduce(
      (acc, curr) => acc + Number(order[curr]),
      0
    )

    const tax = 0.08875
    const orderHistory = this.props.orderHistory

    return (
      <div>
        <CartHeader orderNum={orderNum} orderKeys={orderKeys} />

        {orderKeys[0] ? (
          <div>
            <div className="checkout-summary row">
              <div className="col s12 m10 offset-m1">
                <div className="card blue-grey lighten-4">
                  <div className="card-content checkout-text">
                    <span className="card-title">ORDER SUMMARY</span>
                    <div>
                      <div>
                        Subtotal:{' '}
                        {this.formatPrice(
                          this.orderTotal(order, products, orderKeys)
                        )}
                      </div>
                      <div>Tax: {tax * 100}%</div>
                      <div>Shipping: FREE</div>
                      <div>
                        Total:{' '}
                        {this.formatPrice(
                          this.orderTotal(order, products, orderKeys) *
                            (1 + tax)
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="checkout-text checkout-orders-container row">
              <div className="col s12 m10 offset-m1">
                <h2>View or modify order</h2>
                <div className="checkout-orders">
                  {orderKeys.length && products.length ? (
                    orderKeys.map(productId => (
                      <HomeSearchCard
                        product={products.find(
                          product => product.id === Number(productId)
                        )}
                        key={productId}
                      />
                    ))
                  ) : (
                    <div />
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  order: state.order,
  products: state.product,
  orderHistory: state.user.orderHistory
})

const mapDispatchToProps = dispatch => ({
  fetchOrderHistory: userId => dispatch(fetchOrderHistory(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(CheckOut)
