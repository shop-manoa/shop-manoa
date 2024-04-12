import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Col, Container, Row, Table } from 'react-bootstrap';
import ItemListing from '../components/ItemListing';
import { Profiles } from '../../api/user/Profiles';
import DisplayProfile from '../components/DisplayProfiles';
import LoadingSpinner from '../components/LoadingSpinner';
import { Reports } from '../../api/report/Report';
import ReportItemAdmin from '../components/ReportItemAdmin';

/* A simple static component to render some text for the landing page. */
const AdminHome = () => {
  const { ready, profiles, reports } = useTracker(() => {
    const subscription0 = Meteor.subscribe(Profiles.userPublicationName);
    // const subscription = Meteor.subscribe(Reports.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription0.ready();
    // Get the profile documents
    const profileItems = Profiles.collection.find().fetch();
    const items = Reports.collection.find({}).fetch();
    return {
      profiles: profileItems,
      reports: items,
      ready: rdy,
    };
  }, []);

  const currentUser = Meteor.user();

  return (ready ? (
    <>
      <Container fluid className="pt-3">
        <Row>
          <ItemListing />
          <ItemListing />
          <ItemListing />
          <ItemListing />
          <ItemListing />
          <ItemListing />
        </Row>
      </Container>
      <Container className="py-3">
        <Row className="justify-content-center">
          <Col>
            <Col className="text-center">
              <h2>List Seller Profile</h2>
            </Col>
            <Row xs={1} md={2} lg={3} className="g-4">
              {profiles.map((profile) => (<Col key={profile._id}><DisplayProfile profile={profile} currentUser={currentUser} /> </Col>))}
            </Row>
          </Col>
        </Row>
      </Container>
      <Container className="py-3">
        <Row className="justify-content-center">
          <Col md={7}>
            <Col className="text-center"><h2>List Reports(Admin)</h2></Col>
            <Table striped bordered hover>
              <thead>
                <tr className="text-center">
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
    </>
  ) : <LoadingSpinner />);
};

export default AdminHome;
