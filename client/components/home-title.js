import React from 'react';

const HomeTitle = props => {
  const { price, manufacturer, model } = props.info;

  return (
    <div className="homeTitle">
      <div className="name">
        <div className="manufacturer">{manufacturer + ' -'}</div>
        <div className="model">{' ' + model}</div>
      </div>
      <div className="price">{price}</div>
    </div>
  );
};

export default HomeTitle;
