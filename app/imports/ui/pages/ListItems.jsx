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
    // Find the item index in the stuffs array
    const itemIndex = stuffs.findIndex(item => item._id === itemId);

    // If the item is not found, return
    if (itemIndex === -1) return;

    // Get the item object from the stuffs array
    const item = stuffs[itemIndex];

    // Toggle favorite status locally
    const favorited = !item.favorited;

    // Optimistically update UI
    const updatedStuffs = [...stuffs];
    updatedStuffs[itemIndex] = { ...item, favorited };
    setStuffs(updatedStuffs);

    // Update favoritedBy field in the database
    ItemsList.collection.update({ _id: itemId }, { $set: { favoritedBy: favorited ? Meteor.user().username : null } }, (error) => {
      if (error) {
        console.error('Error toggling favorite:', error);
        // Revert UI changes if database update fails
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
                      {/* Button to toggle favorite status */}
                      <Button
                        variant={stuff.favorited ? 'warning' : 'outline-warning'}
                        onClick={() => toggleFavorite(stuff._id)}
                        style={{ marginRight: '10px', color: stuff.favorited ? 'white' : undefined }}
                        className={stuff.favorited ? 'favorite-button' : ''}
                      >
                        <CiStar style={{ marginRight: '5px' }} /> {/* Adjust styling if needed */}
                        {stuff.favorited ? 'Favorited' : 'Favorite'}
                      </Button>
                      {/* Link to the user's profile page */}
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
