import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/** Renders a single row in the List Report table. See pages/ListReport.jsx */
const ReportItemAdmin = ({ report }) => (
  <tr>
    <Link to={`${report._id}`}>{report._id}</Link>
    <td>{report.types}</td>
    <td>{report.category}</td>
    <td>{report.details}</td>
    <td>{report.owner}</td>
  </tr>
);

// Require a document to be passed to this component.
ReportItemAdmin.propTypes = {
  report: PropTypes.shape({
    // terget ID: String,
    types: PropTypes.string,
    category: PropTypes.string,
    details: PropTypes.string,
    _id: PropTypes.string,
    owner: PropTypes.string,
  }).isRequired,
};

export default ReportItemAdmin;
