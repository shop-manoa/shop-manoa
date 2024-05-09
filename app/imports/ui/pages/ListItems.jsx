import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Card, Col, Container, Row, Button } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { CiStar } from 'react-icons/ci';
import LoadingSpinner from '../components/LoadingSpinner';
import { ItemsList } from '../../api/items/ListItems';
import { Profiles } from '../../api/user/Profiles';
import { Chats } from '../../api/chat/chat'; // Import the Chats collection

const ListItems = () => {
  const { ready, userFavorites } = useTracker(() => {
    const subscription = Meteor.subscribe(Profiles.userPublicationName);
    const rdy = subscription.ready();
    const user = Meteor.user();
    const userFavorites = user && user.profile && user.profile.favorites ? user.profile.favorites : [];
    return {
      ready: rdy,
      userFavorites,
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

  const startChat = (participantId) => {
    Meteor.call('chats.createChat', participantId, (error, chatId) => {
      if (error) {
        console.error('Error creating chat:', error.reason);
      } else {
        // Redirect user to the chat room
        // For example, you can use React Router to redirect
        // window.location.href = `/chat/${chatId}`; // Replace with your actual chat route

        // Add the new chat to the state
        setChats(prevChats => [...prevChats, { id: chatId, participant: participantId }]);
      }
    });
  };

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
                      <Card.Text>{stuff.description}</Card.Text>
                      <img src={stuff.image} alt={stuff.title} style={{ width: '100px', height: '100px' }} />
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
                      <Link to={`/chat/${stuff.owner}`} className="btn btn-primary">
                        Start Chat
                      </Link>
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
