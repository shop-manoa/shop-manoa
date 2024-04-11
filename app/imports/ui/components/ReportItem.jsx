import React from 'react';
import PropTypes from 'prop-types';

/** Renders a single row in the List Report table. See pages/ListReport.jsx */
const ReportItem = ({ report }) => (
  <tr>
    <td>{report.types}</td>
    <td>{report.category}</td>
    <td>{report.details}</td>
  </tr>
);

// Require a document to be passed to this component.
ReportItem.propTypes = {
  report: PropTypes.shape({
    types: PropTypes.string,
    category: PropTypes.string,
    details: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default ReportItem;
