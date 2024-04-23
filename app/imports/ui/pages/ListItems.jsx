import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import { ItemsList } from '../../api/items/ListItems'; // Import the ItemsList collection

const ListItems = () => {
  const { stuffs, ready } = useTracker(() => {
    const subscription = Meteor.subscribe(ItemsList.userPublicationName);
    const rdy = subscription.ready();
    const stuffItems = ItemsList.collection.find({}).fetch();
    return {
      stuffs: stuffItems,
      ready: rdy,
    };
  }, []);

  return (
    ready ? (
      <Container className="py-3">
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
                      <Card.Text>Owner: {stuff.owner}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
            <Row>
              {stuffs.map((stuff) => (
                <ItemListing key={stuff._id} stuff={stuff} />
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    ) : <LoadingSpinner />
  );
};

export default ListItems;
