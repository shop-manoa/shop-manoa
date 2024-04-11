import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card, Image, Form, Button, Modal } from 'react-bootstrap';
import { Ratings } from '../../api/rating/Ratings';

const DisplayProfile = ({ profile, currentUser }) => {
  const [rating, setRating] = useState(0);
  const [averageRating, setAverageRating] = useState('No Ratings');
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const ratings = Ratings.collection.findOne({ userProfileID: profile._id });
    if (ratings && ratings.rating.length > 0) {
      const total = ratings.rating.reduce((acc, curr) => acc + curr, 0);
      setAverageRating((total / ratings.rating.length).toFixed(1));
    }
  }, [profile._id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const currentRatings = Ratings.collection.findOne({ userProfileID: profile._id });
    if (currentRatings) {
      if (currentRatings.ratedBy.includes(currentUser._id)) {
        // User has already rated, update their rating
        const userIndex = currentRatings.ratedBy.indexOf(currentUser._id);
        currentRatings.rating[userIndex] = Number(rating);
        Ratings.collection.update(currentRatings._id, { $set: { rating: currentRatings.rating } });
      } else {
        // User has not rated yet, add their rating
        Ratings.collection.update(currentRatings._id, { $push: { rating: Number(rating), ratedBy: currentUser._id } });
      }
    } else {
      Ratings.collection.insert({ userProfileID: profile._id, rating: [Number(rating)], ratedBy: [currentUser._id] });
    }
    const ratings = Ratings.collection.findOne({ userProfileID: profile._id });
    if (ratings && ratings.rating.length > 0) {
      const total = ratings.rating.reduce((acc, curr) => acc + curr, 0);
      setAverageRating((total / ratings.rating.length).toFixed(1));
    }
    setRating(0);
    handleClose();
  };

  return (
    <Card className="h-100">
      <Card.Header>
        <Image src={profile.image} width={75} />
        <Card.Title>{profile.firstName} {profile.lastName}</Card.Title>
        <Card.Subtitle>Average Rating: {averageRating}</Card.Subtitle>
      </Card.Header>
      <Card.Body>
        <Card.Text>{profile.bio}</Card.Text>
        <Button variant="primary" onClick={handleShow}>
          Give Rating
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Give Rating</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicRange">
                <Form.Label>Rating</Form.Label>
                <Form.Control type="range" min="1" max="5" value={rating} onChange={(e) => setRating(e.target.value)} />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </Card.Body>
    </Card>
  );
};

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
  currentUser: PropTypes.shape({
    _id: PropTypes.string,
  }).isRequired,
};

export default DisplayProfile;
