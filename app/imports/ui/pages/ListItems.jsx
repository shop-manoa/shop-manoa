import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Card, Col, Container, Row, Button } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { CiStar } from 'react-icons/ci';
import LoadingSpinner from '../components/LoadingSpinner';
import { ItemsList } from '../../api/items/ListItems';
import { Profiles } from '../../api/user/Profiles'; // Import user profile collection

const ListItems = () => {
  const { ready, userFavorites } = useTracker(() => {
    const subscription = Meteor.subscribe(Profiles.userPublicationName);
    const rdy = subscription.ready();
    const user = Meteor.user();
    const favoriteItems = user && user.profile && user.profile.favorites ? user.profile.favorites : [];
    return {
      ready: rdy,
      userFavorites: favoriteItems,
    };
  }, []);

  const [stuffs, setStuffs] = useState([]);

  useTracker(() => {
    const subscription = Meteor.subscribe(ItemsList.userPublicationName);
    if (subscription.ready()) {
      const stuffItems = ItemsList.collection.find({}).fetch();
      setStuffs(stuffItems);
    }
  }, []);

  const isFavorited = (itemId) => userFavorites.includes(itemId);

  const toggleFavorite = (itemId) => {
    const itemIndex = stuffs.findIndex(item => item._id === itemId);
    if (itemIndex === -1) return;

    const item = stuffs[itemIndex];
    const favorited = !isFavorited(itemId);

    const updatedStuffs = [...stuffs];
    updatedStuffs[itemIndex] = { ...item, favorited };
    setStuffs(updatedStuffs);

    if (favorited) {
      Meteor.users.update(Meteor.userId(), { $addToSet: { 'profile.favorites': itemId } });
    } else {
      Meteor.users.update(Meteor.userId(), { $pull: { 'profile.favorites': itemId } });
    }
  };

  // Sort items by favorited status, favorited items first
  const sortedStuffs = [...stuffs].sort((a, b) => {
    if (isFavorited(a._id) && !isFavorited(b._id)) return -1;
    if (!isFavorited(a._id) && isFavorited(b._id)) return 1;
    return 0;
  });

  return (
    ready ? (
      <Container id="items-page" className="py-3">
        <Row className="justify-content-center">
          <Col md={12}>
            <Row className="justify-content-center">
              {sortedStuffs.map((stuff) => (
                <Col key={stuff._id} md={4}>
                  <Card>
                    <Card.Body>
                      <Card.Title>{stuff.title}</Card.Title>
                      <img src={stuff.image} alt={stuff.title} style={{ width: '100px', height: '100px' }} />
                      <Card.Text>{stuff.description}</Card.Text>
                      <Card.Text>Category: {stuff.category}</Card.Text>
                      <Card.Text>Condition: {stuff.condition}</Card.Text>
                      <Card.Text>Price: ${stuff.price}</Card.Text>
                      <Button
                        variant={isFavorited(stuff._id) ? 'warning' : 'outline-warning'}
                        onClick={() => toggleFavorite(stuff._id)}
                      >
                        <CiStar style={{ marginRight: '5px' }} />
                        {isFavorited(stuff._id) ? 'Favorited' : 'Favorite'}
                      </Button>
                      <Link to={`/profile/${stuff.owner}`} className="btn btn-outline-primary btn-sm custom-button">View Profile</Link>
                      {/* Added a link to AddReport page */}
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

export default ListItems;
