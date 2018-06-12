import React from 'react'

export default class Confirmation extends React.Component {
  render() {
    console.log('IN CONFIRMATION PAGE')
    return (
      <h3>Success!</h3>
      // <div>
      //   <h3>Success!</h3>
      //       <div className="checkout-summary row">
      //         <div className="col s12 m10 offset-m1">
      //           <div className="card blue-grey lighten-4">
      //             <div className="card-content checkout-text">
      //               <span className="card-title">ORDER SUMMARY</span>
      //               <div>
      //                 <div>Subtotal: {formatPrice(orderTotal)}</div>
      //                 <div>Tax: {tax * 100}%</div>
      //                 <div>Shipping: FREE</div>
      //                 <div>Total: {formatPrice(orderTotal * (1 + tax))}</div>
      //               </div>
      //             </div>
      //           </div>
      //         </div>
      //       </div>
      //       <div className="checkout-text checkout-orders-container row">
      //         <div className="col s12 m10 offset-m1">
      //           <h2>View or modify order</h2>
      //           <div className="checkout-orders">
      //             {Object.keys(this.props.order).length &&
      //             this.props.products.length ? (
      //               Object.keys(this.props.order).map(productId => (
      //                 <HomeSearchCard
      //                   product={this.props.products.find(
      //                     product => product.id === Number(productId)
      //                   )}
      //                   key={productId}
      //                 />
      //               ))
      //             ) : (
      //               <div />
      //             )}
      //           </div>
      //         </div>
      //       </div>
      //     </div>
    )
  }
}
