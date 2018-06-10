import {Link} from 'react-router-dom'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addItemLoggedIn, addItemGuest} from '../../store/order'

class HomeSearchCard extends Component {
  constructor(props) {
    super()
    this.state = {
      productId: props.product.id,
      quantity: 1
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = event => {
    console.log('state in submit', this.state)
    event.preventDefault()
    if (this.props.user.id) {
      this.props.addItemLoggedIn(
        this.props.user.id,
        this.state.productId,
        this.state.quantity
      )
    } else {
      console.log('im a guest', this.props)
      this.props.addItemGuest(this.state.productId, this.state.quantity)
    }
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
              <select
                name="quantity"
                onChange={this.handleChange}
                value={this.props.quantity ? this.props.quantity : 1}
              >
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
                onClick={event => this.handleSubmit(event)}
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
  user: state.user,
  products: state.products
})

const mapDispatchToProps = dispatch => ({
  addItemGuest: (productId, quantity) =>
    dispatch(addItemGuest(productId, quantity)),
  addItemLoggedIn: (userId, productId, quantity) =>
    dispatch(addItemLoggedIn(userId, productId, quantity))
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeSearchCard)
