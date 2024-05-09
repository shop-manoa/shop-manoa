import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const CategoryList = ({ categorystuff }) => (
  <Container>
    <Link to={`/categories/${categorystuff.name}`}>{categorystuff.name}</Link>
  </Container>
);

// Require a document to be passed to this component.
CategoryList.propTypes = {
  categorystuff: PropTypes.shape({
    name: PropTypes.string,
    categoryIndex: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default CategoryList;
