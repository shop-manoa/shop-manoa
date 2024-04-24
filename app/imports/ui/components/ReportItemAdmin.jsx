import React from 'react';
import PropTypes from 'prop-types';

/** Renders a single row in the List Report table. See pages/ListReport.jsx */
const ReportItemAdmin = ({ report }) => (
  <tr>
    <td>{report.target_id}</td>
    <td>{report.users}</td>
    <td>{report.types}</td>
    <td>{report.category}</td>
    <td>{report.details}</td>
    <td>{report.owner}</td>
  </tr>
);

// Require a document to be passed to this component.
ReportItemAdmin.propTypes = {
  report: PropTypes.shape({
    // target_id, users should be optional
    types: PropTypes.string,
    category: PropTypes.string,
    details: PropTypes.string,
    _id: PropTypes.string,
    owner: PropTypes.string,
  }).isRequired,
  target_id: PropTypes.string,
  users: PropTypes.string,
};

export default ReportItemAdmin;
