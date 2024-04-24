import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import ItemListing from '../components/ItemListing';
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
      <Container id="items-page" className="py-3">
        <Row className="justify-content-center">
          <Col md={12}>
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
