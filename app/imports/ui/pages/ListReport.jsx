import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Reports } from '../../api/report/Report';
import ReportItem from '../components/ReportItem';
import LoadingSpinner from '../components/LoadingSpinner';

/* Renders a table containing all of the Report documents. Use <ReportItem> to render each row. */
const ListReport = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, reports } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Report documents.
    const subscription = Meteor.subscribe(Reports.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Report documents
    const reportItems = Reports.collection.find({}).fetch();
    return {
      reports: reportItems,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col md={7}>
          <Col className="text-center">
            <h2>List Reports</h2>
          </Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Type</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => <ReportItem key={report._id} report={report} />)}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ListReport;
