import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { useParams } from 'react-router-dom';
import { Container, Button, Card, Form, Modal, Image, Row, Col } from 'react-bootstrap';
import { Profiles } from '../../api/user/Profiles';
import { ItemsList } from '../../api/items/ListItems';

const ProfilePage = () => {
  let { owner } = useParams();
  if (owner === ':owner') {
    owner = Meteor.user().username;
  }
  const [profileData, setProfileData] = useState(null);
  const [newBio, setNewBio] = useState('');
  const [newImage, setNewImage] = useState('');
  const [items, setItems] = useState([]);

  // State for managing the visibility of the modal
  const [showModal, setShowModal] = useState(false);
  // Check if the user viewing a profile is an admin
  const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');

  useEffect(() => {
    const profile = Profiles.collection.findOne({ owner: owner });
    setProfileData(profile);
    setNewBio(profile ? profile.bio : '');
    setNewImage(profile ? profile.image : '');

    const itemsList = ItemsList.collection.find({ owner: owner }).fetch();
    setItems(itemsList);
  }, [owner]);

  const handleSaveProfile = () => {
    Profiles.collection.update(profileData._id, { $set: { bio: newBio, image: newImage } });
    setProfileData(prevState => ({
      ...prevState,
      bio: newBio,
      image: newImage,
    }));
    setShowModal(false); // Hide the modal when the profile is saved
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const remove = (item) => {
    ItemsList.collection.remove(item);
    setItems(ItemsList.collection.find({ owner: owner }).fetch());
  };

  return (
    <Container id="myprofile-page" className="d-flex flex-column align-items-center" style={{ height: 'vh' }}>
      <Card className="shadow-lg p-3 mb-5 bg-white rounded text-center" style={{ marginTop: '50px' }}>
        <div className="profile-picture-container d-flex flex-column align-items-center">
          {profileData && profileData.image ? (
            <Image src={newImage || profileData.image} alt="Profile" className="profile-picture" roundedCircle style={{ width: '200px', height: '200px' }} />
          ) : (
            <Image src="/images/default-profile-pic.png" roundedCircle style={{ width: '200px', height: '200px' }} />
          )}
          <h2 className="mt-3">{profileData ? `${profileData.firstName} ${profileData.lastName}` : 'Name'}</h2>
          {owner === Meteor.user().username && (
            <Button variant="link" onClick={() => setShowModal(true)}>Edit Profile</Button>
          )}
        </div>
        <h3>About Me</h3>
        <p>{profileData ? profileData.bio : ''}</p>
      </Card>
      {/* Display items */}
      <Row className="g-5" style={{ marginBottom: '50px' }}>  {/* Wrap items in a Row */}
        {items.map(item => (
          <Col key={item._id}>  {/* Wrap each Card in a Col */}
            <Card className="mb-3" style={{ width: '400px' }}>
              <Card.Img variant="top" src={item.image} style={{ width: '100px', height: '100px' }} />
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>
                  {item.description}
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">{item.category} - {item.condition} - ${item.price}</small>
                {item.owner === Meteor.user().username || isAdmin ? (
                  <Button style={{ marginLeft: '10px' }} variant="danger" onClick={() => remove(item._id)}>Remove Item</Button>
                ) : ''}
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Profile Picture</Form.Label>
            <Form.Control type="file" onChange={handleFileChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Bio</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={newBio}
              onChange={(e) => setNewBio(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveProfile}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ProfilePage;
