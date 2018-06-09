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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
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
                We believe in offering quality mobile homes at affordable
                prices.
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
              <span className="card-title">Featured Home</span>
            </div>
            <div className="card-content">
              <p>
                {' '}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
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
