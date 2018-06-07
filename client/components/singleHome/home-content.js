import React from 'react'

const HomeContent = props => {
  const {description} = props.info

  return (
    <div>
      <div className="homeTitle">Home description:</div>
      <div className="homeDescrip homeTitle">{description}</div>
    </div>
  )
}

export default HomeContent
