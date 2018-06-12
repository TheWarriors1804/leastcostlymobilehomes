import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addItemLoggedIn, addItemGuest} from '../../store/order'

class HomeInfo extends Component {
  constructor(props) {
    super()
    this.state = {
      productId: props.info.id,
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
      console.log('im a guest', this.props)
      this.props.addItemGuest(this.state.productId, this.state.quantity)
    }
  }

  render() {
    const {bedrooms, bathrooms, type, length, year, location} = this.props.info
    return (
      <div className="homeInfo">
        <div className="info">
          <div className="title">Bedrooms</div>
          <div className="content">{bedrooms}</div>
        </div>
        <div className="info">
          <div className="title">Bathrooms</div>
          <div className="content">{bathrooms}</div>
        </div>
        <div className="info">
          <div className="title">Type of Home</div>
          <div className="content">{type}</div>
        </div>
        <div className="info">
          <div className="title">Length</div>
          <div className="content">{length + ' ft'}</div>
        </div>
        <div className="info">
          <div className="title">Model Year</div>
          <div className="content">{year}</div>
        </div>
        <div className="info">
          <div className="title">Location</div>
          <div className="content">{location}</div>
        </div>
        <div className="">
          <div className="info infoAdd">
            <span>Quantity:</span>
            <select name="quantity" onChange={this.handleChange}>
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
              type="button"
              className="btn waves-effect waves-light green"
              onClick={event => this.handleSubmit(event)}
            >
              Add to Cart
            </button>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeInfo)
