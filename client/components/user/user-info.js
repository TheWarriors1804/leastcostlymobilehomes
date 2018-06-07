import React from 'react'

const UserInfo = props => {
  const {bedrooms, bathrooms, type, length, year, location} = props.info

  return (
    <div className="homeInfo">
      <div className="info">
        <div className="title">Bedrooms</div>
        <div className="content">{bedrooms}</div>
      </div>
    </div>
  )
}

export default UserInfo
