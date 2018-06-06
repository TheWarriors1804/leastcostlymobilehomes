import { Link } from 'react-dom';
import React from 'react';

const HomeSearchCard = props => {
  const {
    bedrooms,
    bathrooms,
    year,
    price,
    manufacturer,
    model,
    imageUrl
  } = props.info;

  return (
    <div>
      <div>
        <img src={imageUrl} />
      </div>
      <div>Model</div>
    </div>
  );
};

export default HomeSearchCard;
