import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Card, Col, Container, Row, Button, Modal } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { CiStar } from 'react-icons/ci';
import LoadingSpinner from '../components/LoadingSpinner';
import { ItemsList } from '../../api/items/ListItems';
import { Profiles } from '../../api/user/Profiles';

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');

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
                <Col key={stuff._id} md={4} className="d-flex align-items-stretch">
                  <Card className="mb-4" style={{ width: '500px' }}>
                    <Card.Body>
                      <Card.Title>{stuff.title}</Card.Title>
                      <div className="d-flex justify-content-center">
                        <img src={stuff.image} alt={stuff.title} style={{ width: '200px', height: '200px' }} />
                      </div>
                      <Card.Text>
                        {stuff.description.length > 100 ? `${stuff.description.substring(0, 100)}...` : stuff.description}
                        <br />
                        {stuff.description.length > 100 && (
                          // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
                          <span onClick={() => { setModalContent(stuff); setIsModalOpen(true); }} style={{ color: 'blue', cursor: 'pointer' }}>
                            View More
                          </span>
                        )}
                      </Card.Text>
                      <Card.Text>Category: {stuff.category}</Card.Text>
                      <Card.Text>Condition: {stuff.condition}</Card.Text>
                      <Card.Text>Price: ${stuff.price}</Card.Text>
                      <Card.Text>Contact: {stuff.contact}</Card.Text> {/* Display contact */}
                    </Card.Body>
                    <Card.Footer>
                      <Button className="btn btn-sm custom-button" variant={isFavorited(stuff._id) ? 'warning' : 'outline-warning'} onClick={() => toggleFavorite(stuff._id)}>
                        <CiStar style={{ marginRight: '5px' }} />
                        {isFavorited(stuff._id) ? 'Favorited' : 'Favorite'}
                      </Button>
                      <Link to={`/profile/${stuff.owner}`} className="btn btn-outline-primary btn-sm custom-button" style={{ marginLeft: '10px' }}>View Profile</Link>
                      {/* Added a link to AddReport page */}
                      <Link to="../addReport" id="report-button" className="btn btn-outline-danger btn-sm custom-button" style={{ marginLeft: '10px' }}>report</Link>
                    </Card.Footer>
                  </Card>
                </Col>
              ))}
              <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)}>
                <Modal.Header closeButton>
                  <Modal.Title>{modalContent.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="d-flex justify-content-center">
                    <img src={modalContent.image} alt={modalContent.title} style={{ width: '200px', height: '200px' }} />
                  </div>
                  <p>{modalContent.description}</p>
                  <p>Category: {modalContent.category}</p>
                  <p>Condition: {modalContent.condition}</p>
                  <p>Price: ${modalContent.price}</p>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            </Row>
          </Col>
        </Row>
      </Container>
    ) : <LoadingSpinner />
  );
};

export default ListItems;
