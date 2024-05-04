import React from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Card, Col, Container, Row, Button } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { CiStar } from 'react-icons/ci';
import LoadingSpinner from '../components/LoadingSpinner';
import { ItemsList } from '../../api/items/ListItems';

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

  // Function to handle toggling item favorite status
  const toggleFavorite = (itemId) => {
    const itemIndex = stuffs.findIndex(item => item._id === itemId);

    if (itemIndex === -1) return;

    const item = stuffs[itemIndex];
    const favorited = !item.favorited;

    const updatedStuffs = [...stuffs];
    updatedStuffs[itemIndex] = { ...item, favorited };

    setStuffs(updatedStuffs);

    ItemsList.collection.update({ _id: itemId }, { $set: { favoritedBy: favorited ? Meteor.user().username : null } }, (error) => {
      if (error) {
        console.error('Error toggling favorite:', error);
        setStuffs(stuffs => stuffs.map(item => (item._id === itemId ? { ...item, favorited: !favorited } : item)));
      }
    });
  };

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
                      <Button
                        variant={stuff.favorited ? 'warning' : 'outline-warning'}
                        onClick={() => toggleFavorite(stuff._id)}
                        style={{ marginRight: '10px', color: stuff.favorited ? 'white' : undefined }}
                        className={stuff.favorited ? 'favorite-button' : ''}
                      >
                        <CiStar style={{ marginRight: '5px' }} />
                        {stuff.favorited ? 'Favorited' : 'Favorite'}
                      </Button>
                      <Link to={`/profile/${stuff.owner}`} className="btn btn-outline-primary btn-sm custom-button">View Profile</Link>
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

export default ListItems;
