import {Link} from 'react-router-dom'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addItemLoggedIn, addItemGuest, removeItemLoggedIn, removeItemGuest} from '../../store/order'

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
    event.preventDefault()
    if (this.props.user.id) {
      this.props.addItemLoggedIn(
        this.props.user.id,
        this.state.productId,
        this.state.quantity
      )
    } else {
      this.props.addItemGuest(this.state.productId, this.state.quantity)
    }
  }

  handleRemove = event => {
    this.props.user.id ?
    this.props.removeItemLoggedIn( this.state.productId, this.props.user.id) :
    this.props.removeItemGuest( this.state.productId)
    console.log('trying to handle remove')
  }

  render() {
    const {
      bedrooms,
      bathrooms,
      id,
      year,
      price,
      model,
      imageUrl
    } = this.props.product

    const formatPrice = Number(price).toLocaleString('en', {
      style: 'currency',
      currency: 'USD'
    })
    return (
      <div className="row">
        <div className="card horizontal col s12 m11 l9">
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
                defaultValue={
                  this.props.order[this.state.productId]
                    ? this.props.order[this.state.productId]
                    : 1
                }
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
                className={`btn waves-effect waves-light ${
                  this.props.order[this.state.productId] ? `blue` : `green`
                }`}
                onClick={event => this.handleSubmit(event)}
              >
                {this.props.order[this.state.productId]
                  ? `Update Quantity`
                  : `Add to Cart`}
              </button>
              {this.props.quantity ? <button type='remove' onClick ={event => this.handleRemove(event)}> Remove Item </button> : <div></div>}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  products: state.products,
  order: state.order
})

const mapDispatchToProps = dispatch => ({
  addItemGuest: (productId, quantity) =>
    dispatch(addItemGuest(productId, quantity)),
  addItemLoggedIn: (userId, productId, quantity) =>
    dispatch(addItemLoggedIn(userId, productId, quantity)),
    removeItemLoggedIn: (productId, userId) =>
    dispatch(removeItemLoggedIn(productId, userId)),
    removeItemGuest: (productId) =>
    dispatch(removeItemGuest(productId))
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeSearchCard)
