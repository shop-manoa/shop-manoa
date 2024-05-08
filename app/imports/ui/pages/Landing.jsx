import React from 'react';
import { Card, CardTitle, CardSubtitle, CardText, CardLink, Col, Container, Row, CardBody } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { ItemsList } from '../../api/items/ListItems';

/* A simple static component to render some text for the landing page. */
const Landing = () => {
  const randomItem = useTracker(() => {
    const subscription = Meteor.subscribe(ItemsList.userPublicationName);
    if (subscription.ready()) {
      const stuffItems = ItemsList.collection.find({}).fetch();
      // Shuffle the items to get a random selection
      const shuffledItems = stuffItems.sort(() => Math.random() - 0.5);
      // Take the first item for display
      return shuffledItems[0];
    }
    return null;
  }, []);

  return (
    <Container id="landing-page" fluid className="py-3">
      <Row className="align-items-center">
        <Col xs={5} className="px-5">
          {/* Wrap the heading inside a div with white background */}
          <div className="white-background mb-4 text-center">
            <h1 style={{ color: 'darkgreen' }}>RANDOM ITEM!!!</h1>
          </div>
          {randomItem && (
            <Card key={randomItem._id} className="mx-5 mb-4 text-center">
              <div className="d-flex justify-content-center align-items-center" style={{ paddingTop: '20px' }}> {/* Add padding */}
                <Card.Img src={randomItem.image} alt={randomItem.title} className="img-fluid" style={{ maxWidth: '40%', height: 'auto' }} />
              </div>
              <CardBody className="d-flex flex-column justify-content-center">
                <CardTitle>{randomItem.title}</CardTitle>
                <CardSubtitle>{randomItem.owner}</CardSubtitle>
                <CardText>{randomItem.description}</CardText>
                <Link to={`/profile/${randomItem.owner}`} className="btn btn-outline-primary btn-sm custom-button">View Profile</Link>
              </CardBody>
            </Card>
          )}
        </Col>

        <Col xs={7} className="d-flex flex-column justify-content-center">
          <div className="white-background">
            <h1 style={{ color: 'darkgreen' }}>What is Shop Manoa?</h1>
            <p style={{ color: 'darkgreen' }}>Shop Manoa is a marketplace designed by and for University of Hawaii at Manoa students and faculty to facilitate the buying and selling of various student-related goods and services.</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Landing;
