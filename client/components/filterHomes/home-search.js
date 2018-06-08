import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {HomeSearchCard} from '../index'
import {Link} from 'react-router-dom'
/**
 * COMPONENT
 */
export class HomeSearch extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  onChange(event) {}

  onSubmit(event) {
    event.preventDefault()
  }

  render() {
    return (
      <div className="searchPageContainer row">
        <div className="homeFilter card col s12 m4 l3">
          <div className="card-content">
            <span className="card-title">Modify Results</span>
            <form onChange={event => this.onChange(event)}>
              <div>Type</div>
              <label htmlFor="all">
                <input type="radio" name="type" value="all" defaultChecked />
                <span>All homes</span>
              </label>
              <label htmlFor="singleWide">
                <input type="radio" name="type" value="singleWide" />
                <span>Single Wide</span>
              </label>
              <label htmlFor="doubleWide">
                <input type="radio" name="type" value="doubleWide" />
                <span>Double Wide</span>
              </label>
              <label htmlFor="tinyHome">
                <input type="radio" name="type" value="tinyHome" />
                <span>Tiny Home</span>
              </label>
            </form>
            <form>
              <div>Maximum Price</div>
              <select name="maxPrice" onChange={event => this.onChange(event)}>
                <option disabled defaultValue value>
                  {' '}
                  --select--
                </option>
                <option value="60000">$60,000</option>
                <option value="80000">$80,000</option>
                <option value="100000">$100,000</option>
              </select>
            </form>
            <form>
              <div>Bedrooms</div>
              <select name="bedrooms" onChange={event => this.onChange(event)}>
                <option disabled defaultValue value>
                  {' '}
                  --select--
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4+</option>
              </select>
            </form>
            <form>
              <div>Bathrooms</div>
              <select name="bathrooms" onChange={event => this.onChange(event)}>
                <option disabled defaultValue value>
                  --select--
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4+</option>
              </select>
            </form>
            <input
              type="submit"
              value="Submit"
              className="btn waves-effect waves-light green"
              onSubmit={event => this.onSubmit(event)}
            />
          </div>
        </div>
        <div className="col s12 m10 l11 searchTileContainer">
          {this.props.product.map(oneProduct => (
            <HomeSearchCard product={oneProduct} key={oneProduct.id} />
          ))}
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    product: state.product
  }
}

export default connect(mapState)(HomeSearch)

/**
 * PROP TYPES
 */
// SingleHome.propTypes = {
//   email: PropTypes.string
// };
