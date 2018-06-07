import { Link } from 'react-dom';
import React from 'react';
import { HomeSearchCard } from './index';

const CheckOut = props => {
  const state = {
    bedrooms: 3,
    bathrooms: 1,
    imageUrl:
      'https://mhdirect-inboundhorizonsi.netdna-ssl.com/wp-content/uploads/2016/05/Manufactured-ABSOLUTE-VALUE-38SLT28764AH-20170309-1224356555225.jpg',
    year: 2014,
    manufacturer: 'Bob Builder',
    model: 'STU-845CX',
    price: 85750.0,
    id: 1
  };
  return (
    <div>
      <div>CheckOut!!!</div>
      <hr />
      <div>
        <HomeSearchCard info={state} />
      </div>
    </div>
  );
};

export default CheckOut;
