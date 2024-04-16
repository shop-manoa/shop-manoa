import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Container, Row } from 'react-bootstrap';
import ItemListing from '../components/ItemListing';
import { Profiles } from '../../api/user/Profiles';
import LoadingSpinner from '../components/LoadingSpinner';
import ListReportAdmin from './ListReportAdmin';
import ListProfile from './ListProfile';

/* A simple static component to render some text for the landing page. */
const AdminHome = () => {
  const { ready } = useTracker(() => {
    const subscription0 = Meteor.subscribe(Profiles.userPublicationName);
    // const subscription = Meteor.subscribe(Reports.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription0.ready();
    // Get the profile documents
    return {
      ready: rdy,
    };
  }, []);
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
      <Container>
        {/* Calling ListProfile to show the table */}
        <ListProfile />
      </Container>
      <Container>
        {/* Calling ListReportAdmin to show the table */}
        <ListReportAdmin />
      </Container>
    </>
  ) : <LoadingSpinner />);
};

export default AdminHome;
