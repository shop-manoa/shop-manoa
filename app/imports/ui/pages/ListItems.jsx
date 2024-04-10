import React from 'react';
import PropTypes from 'prop-types';

const ListItems = ({ item }) => (
  <div className="list-item">
    <img src={item.picture} alt={item.name} className="item-picture" />
    <div className="item-details">
      <div className="item-price">Price: ${item.price}</div>
      <div className="item-condition">Condition: {item.condition}</div>
      <div className="item-description">Description: {item.description}</div>
    </div>
  </div>
);

ListItems.propTypes = {
  item: PropTypes.shape({
    picture: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    condition: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default ListItems;
