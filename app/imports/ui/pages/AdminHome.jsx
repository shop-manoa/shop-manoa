import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Container } from 'react-bootstrap';
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
        {/* Calling ListProfile to show the table */}
        <ListProfile />
      </Container>
      <Container fluid className="pt-3">
        {/* Calling ListReportAdmin to show the table */}
        <ListReportAdmin />
      </Container>
    </>
  ) : <LoadingSpinner />);
};

export default AdminHome;
