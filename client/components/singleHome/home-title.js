import React from 'react'

const HomeTitle = props => {
  const {price, manufacturer, model} = props.info

  const formatPrice = price.toLocaleString('en', {
    style: 'currency',
    currency: 'USD'
  })

  return (
    <div className="titleHeight">
      <div className="homeTitle flexContainer">
        <div className="name flexContainer">
          <div>{manufacturer + ' - '}</div>
          <div>{model}</div>
        </div>
        <div>{formatPrice}</div>
      </div>
      <hr />
    </div>
  )
}

export default HomeTitle
