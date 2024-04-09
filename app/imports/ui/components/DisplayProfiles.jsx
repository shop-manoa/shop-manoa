import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image } from 'react-bootstrap';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const DisplayProfile = ({ profile }) => (
  <Card className="h-100">
    <Card.Header>
      <Image src={profile.image} width={75} />
      <Card.Title>{profile.firstName} {profile.lastName}</Card.Title>
    </Card.Header>
    <Card.Body>
      <Card.Text>{profile.bio}</Card.Text>
    </Card.Body>
  </Card>
);

// Require a document to be passed to this component.
DisplayProfile.propTypes = {
  profile: PropTypes.shape({
    image: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    bio: PropTypes.string,
    owner: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};
export default DisplayProfile;
