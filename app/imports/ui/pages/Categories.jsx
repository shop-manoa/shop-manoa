import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import { CategoryStuffs } from '../../api/category/CategoryStuff';
import CategoryList from '../components/CategoryList';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const Categories = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, categorystuff } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe(CategoryStuffs.userPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const cattegoryItems = CategoryStuffs.collection.find({}).fetch();
    return {
      categorystuff: cattegoryItems,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container id="categories-page" className="py-3">
      <Row className="justify-content-center">
        <Col md={7}>
          <Col className="text-center" />
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Categories</th>
              </tr>
            </thead>
            <tbody>
              {categorystuff.map((category) => <CategoryList key={category._id} categorystuff={category} />)}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default Categories;
