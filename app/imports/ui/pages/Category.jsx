import React from 'react';
import { useParams } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { ItemsList } from '../../api/items/ListItems';
import ItemListing from '../components/ItemListing';
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
    const stuffItems = ItemsList.collection.find(pageName).fetch();
    return {
      stuffs: stuffItems,
      ready: rdy,
    };
  }, []);

  return (
    ready ? (
      <Container id="category-page" className="py-3">
        <h2>This page is for {pageName}</h2>
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
  // const { _id } = useParams();

  // Posts.find({id:Meteor.userId()}).fetch()[0].title
  // const subscription = Meteor.subscribe(CategoryStuffs.userPublicationName);
  // Determine if the subscription is ready
  // Get the document
  // const document = CategoryStuffs.collection.findOne(_id);
  // const pog = CategoryStuffs.collection.findOne(_id);
  // const test = pog.CategoryStuffs().name();
  // return <div>{_id} WTF</div>;
};
// Fiqure Out how to get the name of the Category

export default Categories;
