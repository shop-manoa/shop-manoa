// ListProfile.jsx

import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import { Profiles } from '../../api/user/Profiles';
import DisplayProfile from '../components/DisplayProfiles';
import { Chats } from '../../api/chat/chat'; // Import the Chats collection

const ListProfile = () => {
  const { ready, profiles } = useTracker(() => {
    const subscription = Meteor.subscribe(Profiles.userPublicationName);
    const rdy = subscription.ready();
    const profileItems = Profiles.collection.find().fetch();
    return {
      profiles: profileItems,
      ready: rdy,
    };
  }, []);

  const currentUser = Meteor.user();

  const startChat = (participantId) => {
    Meteor.call('chats.createChat', participantId, (error, chatId) => {
      if (error) {
        console.error('Error creating chat:', error.reason);
      } else {
        // Redirect user to the chat room
        // For example, you can use React Router to redirect
        // window.location.href = `/chat/${chatId}`; // Replace with your actual chat route
      }
    });
  };

  return (ready ? (
    <Container id="listprofile-page" className="py-3">
      <Row className="justify-content-center">
        <Col>
          <Col className="text-center">
            <h2>List Seller Profile</h2>
            </Col>
            <Row xs={1} md={2} lg={3} className="g-4">
              {profiles.map((profile) => (
                  <Col key={profile._id}>
                    <DisplayProfile profile={profile} currentUser={currentUser} />
                    <Button
                        variant="primary"
                        onClick={() => startChat(profile.owner)} // Pass owner ID as participantId
                    >
                      Start Chat
                    </Button>
                    <Link to={`/profile/${profile.owner}`} className="btn btn-outline-primary btn-sm custom-button" style={{ marginLeft: '10px' }}>View Profile</Link>
                  </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
  ) : <LoadingSpinner />);
};

export default ListProfile;
