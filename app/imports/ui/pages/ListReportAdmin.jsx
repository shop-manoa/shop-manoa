import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { Reports } from '../../api/report/Report';
import LoadingSpinner from '../components/LoadingSpinner';
import ReportItemAdmin from '../components/ReportItemAdmin';

/* Renders a table containing all of the Stuff documents. Use <StuffItemAdmin> to render each row. */
const ListReportAdmin = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { reports, ready } = useTracker(() => {
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(Reports.adminPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const items = Reports.collection.find({}).fetch();
    return {
      reports: items,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col md="auto">
          <Col className="text-center"><h2>List Reports(Admin)</h2></Col>
          <Table striped bordered hover>
            <thead>
              <tr className="text-center">
                <th>ID</th>
                <th>Reportee</th>
                <th>Types</th>
                <th>Category</th>
                <th>Details</th>
                <th>Owner</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => <ReportItemAdmin key={report._id} report={report} />)}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ListReportAdmin;
