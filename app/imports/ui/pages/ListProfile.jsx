import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import { Profiles } from '../../api/user/Profiles';
import DisplayProfile from '../components/DisplayProfiles';

const ListProfile = () => {
  const { ready, profiles } = useTracker(() => {
    const subscription0 = Meteor.subscribe(Profiles.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription0.ready();
    // Get the profile documents
    const profileItems = Profiles.collection.find().fetch();
    return {
      profiles: profileItems,
      ready: rdy,
    };
  }, []);

  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col>
          <Col className="text-center">
            <h2>List Seller Profile</h2>
          </Col>
          <Row xs={1} md={2} lg={3} className="g-4">
            {profiles.map((profile) => (<Col key={profile._id}><DisplayProfile profile={profile} /> </Col>))}

          </Row>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ListProfile;
