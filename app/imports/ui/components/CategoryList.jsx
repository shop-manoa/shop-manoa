import React from 'react';
import PropTypes from 'prop-types';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const CategoryList = ({ categorystuff }) => (
  <tr>
    <td>{categorystuff.name}</td>
    <td>{categorystuff.categoryIndex}</td>
  </tr>
);

// Require a document to be passed to this component.
CategoryList.propTypes = {
  categorystuff: PropTypes.shape({
    name: PropTypes.string,
    categoryIndex: PropTypes.string,
  }).isRequired,
};

export default CategoryList;
