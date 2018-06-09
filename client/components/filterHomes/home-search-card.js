import {Link} from 'react-router-dom'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addItemLoggedIn, addItemGuest} from '../../store/order'

class HomeSearchCard extends Component {
  constructor() {
    super()
    this.state = {
      productId: null,
      quantity: 0
    }
  }



  handleSubmit = event => {
    event.preventDefault()
    if(this.props.user.id) {
      this.props.addItemLoggedIn()
    } else {
      console.log('im a guest')
      this.props.addItemGuest({2:10})
    }
    // if(!this.props.user.id) {
    //   console.log('im a guest')
    // }
    // const method = props.user.id ? props.addItemLoggedIn : props.addItemGuest
    // method()
  }

  render() {
    const {
      bedrooms,
      bathrooms,
      id,
      year,
      price,
      manufacturer,
      model,
      imageUrl
    } = this.props.product

    const formatPrice = Number(price).toLocaleString('en', {
      style: 'currency',
      currency: 'USD'
    })
    return (
      <div className="row">
        <div className="card horizontal col s12 m10 l8">
          <div className="card-image">
            <Link to={`/singleHome/${id}`}>
              <img src={imageUrl} />
            </Link>
          </div>
          <div className="card-stacked">
            <div className="card-content">
              <div>Model: {model}</div>
              <div>Price: {formatPrice}</div>
              <div>Bedrooms: {bedrooms}</div>
              <div>Bathrooms: {bathrooms}</div>
              <div>Year: {year}</div>
            </div>
            <div className="card-action">
              <span>Quantity: </span>
              <select>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
              <button
                type="submit"
                className="btn waves-effect waves-light green"
                onClick={(event) => this.handleSubmit(event)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  addItemGuest: (productId, quantity) =>
    dispatch(addItemGuest(productId, quantity)),
  addItemLoggedIn: (userId, productId, quantity) =>
    dispatch(addItemLoggedIn(userId, productId, quantity))
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeSearchCard)
