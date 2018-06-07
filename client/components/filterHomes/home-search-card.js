import {Link} from 'react-dom'
import React from 'react'

const HomeSearchCard = props => {
  const {
    bedrooms,
    bathrooms,
    year,
    price,
    manufacturer,
    model,
    imageUrl
  } = props.info

  const formatPrice = price.toLocaleString('en', {
    style: 'currency',
    currency: 'USD'
  })

  return (
    <div className="row">
      <div className="card horizontal col s12 m8 l6">
        <div className="card-image">
          <img src={imageUrl} />
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
            <a href="#buy-house">Buy Now</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeSearchCard
