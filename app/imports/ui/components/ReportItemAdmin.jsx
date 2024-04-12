import React from 'react';
import PropTypes from 'prop-types';

/** Renders a single row in the List Report table. See pages/ListReport.jsx */
const ReportItemAdmin = ({ report }) => (
  <tr>
    <td>{report.types}</td>
    <td>{report.category}</td>
    <td>{report.details}</td>
    <td>{report.owner}</td>
  </tr>
);

// Require a document to be passed to this component.
ReportItemAdmin.propTypes = {
  report: PropTypes.shape({
    types: PropTypes.string,
    category: PropTypes.string,
    details: PropTypes.string,
    _id: PropTypes.string,
    owner: PropTypes.string,
  }).isRequired,
};

export default ReportItemAdmin;
