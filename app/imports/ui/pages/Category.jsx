import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { ItemsList } from '../../api/items/ListItems';
import LoadingSpinner from '../components/LoadingSpinner';
// PlaceHolder for the Categories Tab
function helper() {
  const { _name } = useParams();
  return _name;
}
const Categories = () => {
  const pageName = helper();

  const { stuffs, ready } = useTracker(() => {
    const subscription = Meteor.subscribe(ItemsList.userPublicationName);
    const rdy = subscription.ready();
    const stuffItems = ItemsList.collection.find({ category: pageName }).fetch();
    return {
      stuffs: stuffItems,
      ready: rdy,
    };
  }, []);

  return (
    ready ? (
      <Container id="items-page" className="py-3">
        <Row className="justify-content-center">
          <Col md={12}>
            <Row className="justify-content-center">
              {stuffs.map((stuff) => (
                <Col key={stuff._id} md={4}>
                  <Card>
                    <Card.Body>
                      <Card.Title>{stuff.title}</Card.Title>
                      <Card.Text>{stuff.description}</Card.Text>
                      <img src={stuff.image} alt={stuff.title} style={{ width: '100px', height: '100px' }} />
                      <Card.Text>Category: {stuff.category}</Card.Text>
                      <Card.Text>Condition: {stuff.condition}</Card.Text>
                      <Card.Text>Price: ${stuff.price}</Card.Text>
                      {/* Link to the user's profile page */}
                      <Link to={`/profile/${stuff.owner}`} className="btn btn-outline-primary btn-sm custom-button" style={{ marginLeft: '10px' }}>View Profile</Link>
                      <Link to="../addReport" id="report-button" className="btn btn-outline-danger btn-sm custom-button" style={{ marginLeft: '10px' }}>report</Link>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    ) : <LoadingSpinner />
  );
};

export default Categories;
