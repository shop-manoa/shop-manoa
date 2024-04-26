import React from 'react';
import PropTypes from 'prop-types';

/** Renders a single row in the List Report table. See pages/ListReport.jsx */
const ReportItemAdmin = ({ report }) => {
  let name;
  if (report.firstName === 'N/A' && report.lastName === 'N/A') {
    name = 'N/A';
  } else {
    name = `${report.firstName} ${report.lastName}`;
  }

  return (
    <tr>
      <td>{name}</td>
      <td>{report.title}</td>
      <td>{report.target_id}</td>
      <td>{report.types}</td>
      <td>{report.category}</td>
      <td>{report.details}</td>
      <td>{report.owner}</td>
    </tr>
  );
};

// Require a document to be passed to this component.
ReportItemAdmin.propTypes = {
  report: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    title: PropTypes.string,
    target_id: PropTypes.string,
    types: PropTypes.string,
    category: PropTypes.string,
    details: PropTypes.string,
    owner: PropTypes.string,
  }).isRequired,
};

export default ReportItemAdmin;
