import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

export const HomePage = props => {
  return (
    <div className="homepage-container">
      <div className="homepage-header">
        <h1>Welcome to Least Costly Mobile Homes Direct!</h1>
        <h2>
          Your source for the highest quality and least costly mobile homes
        </h2>
      </div>
      <div className="homepage-content row">
        <div className="col s12 m8 offset-m2">
          Committed to excellence since 1977, Least Costly Mobile Homes Direct
          is dedicated to providing our customers with the highest quality and
          least costly mobile homes. We source our homes directly from
          manufacturers, bypassing middle men and passing along cost savings.
          You will not be disappointed with one of our tiny, single wide, or
          double wide homes! Not sure which home is right for you? Chat with us
          by pressing the blue button at the bottom right of the screen! Our
          dedicated employees are available to talk about your new home 24/7,
          365 days a year!
        </div>
      </div>
      <div className="homepage-cards row">
        <div className="col s12 m4">
          <div className="card">
            <div className="card-image">
              <img src="https://images.pexels.com/photos/567633/pexels-photo-567633.jpeg" />
              <span className="card-title">Our Company Philosophy</span>
            </div>
            <div className="card-content">
              <p>
                At Least Costly Mobile Homes Direct, we believe in offering
                quality mobile homes at impossible-to-beat prices. Find a lower
                price for your dream mobile home? We'll beat the competitor's
                prices!
              </p>
            </div>
            <div className="card-action">
              <Link to="/signup">Sign up now!</Link>
            </div>
          </div>
        </div>
        <div className="col s12 m4">
          <div className="card">
            <div className="card-image">
              <img src="https://static1.squarespace.com/static/556def68e4b0fb59709c7d04/59f7cf8c0d92972b61a51365/59f7dd146926704f35548f70/1509901300163/DSCF4735.jpg?format=1500w" />
              <span className="card-title">Browse Homes</span>
            </div>
            <div className="card-content">
              <p>
                We have the largest selection of mobile homes nationwide. Choose
                between tiny homes, single wide, and double wide homes.
              </p>
            </div>
            <div className="card-action">
              <Link to="/homeSearch">Shop now</Link>
            </div>
          </div>
        </div>
        <div className="col s12 m4">
          <div className="card">
            <div className="card-image">
              <img src="https://static1.squarespace.com/static/556def68e4b0fb59709c7d04/5934305837c581fea8458aa5/593433d9d2b85729114d95a9/1496608025080/DSCF4278.jpg?format=1500w" />
              <span className="card-title">Featured Home - The Ironclad</span>
            </div>
            <div className="card-content">
              <p>
                {' '}
                This sleek and modern tiny house won't stand up to canon balls
                like the Civil War ships that inspired its name, but the 40-year
                warranty metal siding and roofing are incredibly durable and low
                maintenance.
              </p>
            </div>
            <div className="card-action">
              <Link to="/singleHome/10">More Details</Link>
            </div>
          </div>
        </div>
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
