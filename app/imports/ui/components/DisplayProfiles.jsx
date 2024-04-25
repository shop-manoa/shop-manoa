// DisplayProfile.jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Image, Form, Button, Modal, Alert } from 'react-bootstrap';
import { Ratings } from '../../api/rating/Ratings';

const DisplayProfile = ({ profile, currentUser }) => {
  const imgSrc = profile.image ? profile.image : '/images/default-profile-pic.png';
  const [rating, setRating] = useState(0);
  const [averageRating, setAverageRating] = useState('No Ratings');
  const [show, setShow] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleClose = () => {
    setShow(false);
    setSubmitted(false);
  };
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
    setSubmitted(true);
  };

  return (
    <Card className="h-100 shadow">
      <Card.Header className="bg-primary text-white">
        <Image src={imgSrc} width={100} height={100} roundedCircle />
        <Card.Title>{profile.firstName} {profile.lastName}</Card.Title>
        <Card.Subtitle>Average Rating: {averageRating}</Card.Subtitle>
      </Card.Header>
      <Card.Body>
        <Card.Text>{profile.bio}</Card.Text>
        <Button variant="outline-primary" onClick={handleShow} className="btn-sm custom-button" style={{ marginRight: '10px' }}>
          Give Rating
        </Button>
        <Link to={`/profile/${profile.owner}`} className="btn btn-outline-primary btn-sm custom-button">
          View Profile
        </Link>
        {/* Added a link to AddReport page */}
        <Link to="../addReport" id="reportButton" className="btn btn-outline-danger btn-sm custom-button" style={{ marginLeft: '10px' }}>
          Report
        </Link>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Give Rating</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicSelect">
                <Form.Label>Rating</Form.Label>
                <Form.Control as="select" value={rating} onChange={(e) => setRating(e.target.value)}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </Form.Control>
              </Form.Group>
              <Button variant="primary" type="submit" className="custom-button">
                Submit
              </Button>
            </Form>
            {submitted && <Alert variant="success" onClose={() => setSubmitted(false)} dismissible>Rating submitted successfully!</Alert>}
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
