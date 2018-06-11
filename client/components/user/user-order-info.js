import React from 'react'

const HomeUserInfo = props => {
  const {bedrooms, bathrooms, type, length, year, location} = props.info

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
      <div className="flexContainer">
        <div className="info">
          <span>Quantity:</span>
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
            onClick={props.handleSubmit}
          >
            Buy Again
          </button>
        </div>
      </div>
    </div>
  )
}

export default HomeUserInfo
