import React from 'react';
import ItemList from './ItemList';

const ListItems = () => {
  const items = ItemList(); // Call the ItemList component as a function to fetch items

  return (
      <div>
        <h2>List of Products</h2>
        <table>
          <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Image</th>
            <th>Category</th>
            <th>Condition</th>
            <th>Price</th>
          </tr>
          </thead>
          <tbody>
          {items.map((item, index) => (
              <tr key={index}>
                <td>{item.title}</td>
                <td>{item.description}</td>
                <td><img src={item.image} alt={item.title} style={{ width: '50px', height: '50px' }} /></td>
                <td>{item.category}</td>
                <td>{item.condition}</td>
                <td>{item.price}</td>
              </tr>
          ))}
          </tbody>
        </table>
      </div>
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row, Card } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import ItemListing from '../components/ItemListing';
import { ItemsList } from './ListItems'; // Import the ItemsList collection

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
