import React, { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { ItemsList } from '../../api/items/ListItems';

const UserHome = () => {
  const [favoriteItems, setFavoriteItems] = useState([]);

  useTracker(() => {
    const subscription = Meteor.subscribe('userFavorites');

    if (subscription.ready()) {
      const userFavorites = ItemsList.collection.find({ favoritedBy: Meteor.user().username }).fetch();
      setFavoriteItems(userFavorites);
    }
  }, []);

  return (
    <Container id="userhome-page" fluid className="pt-3">
      <Row xs={1} md={3} className="g-4">
        {favoriteItems.map((item) => (
          <Col key={item._id}>
            <Card>
              <Card.Img variant="top" src={item.image} style={{ width: '100px', height: '100px' }} />
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>{item.description}</Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">{item.category} - {item.condition} - ${item.price}</small>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default UserHome;
