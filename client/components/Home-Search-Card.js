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
    <div className="flexContainer searchCard">
      <div>
        <img className="searchCardImage" src={imageUrl} />
      </div>
      <div>
        <div className="flexContainer">
          <div>{manufacturer + ' - '}</div>
          <div>{model}</div>
          <div>{formatPrice}</div>
        </div>
        <div>
          <div>Bedrooms: {bedrooms}</div>
          <div>Bathrooms: {bathrooms}</div>
          <div>Year: {year}</div>
        </div>
      </div>
    </div>
  )
}

export default HomeSearchCard
