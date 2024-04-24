import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { useParams } from 'react-router-dom';
import { Container, Button, Card, Form, Modal, Image } from 'react-bootstrap';
import { Profiles } from '../../api/user/Profiles';

const ProfilePage = () => {
  let { owner } = useParams();
  if (owner === ':owner') {
    owner = Meteor.user().username;
  }
  const [profileData, setProfileData] = useState(null);
  const [newBio, setNewBio] = useState('');
  const [newImage, setNewImage] = useState('');

  // State for managing the visibility of the modal
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const profile = Profiles.collection.findOne({ owner: owner });
    setProfileData(profile);
    setNewBio(profile ? profile.bio : '');
    setNewImage(profile ? profile.image : '');
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

  return (
    <Container id="myprofile-page" className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
      <Card className="shadow-lg p-3 mb-5 bg-white rounded text-center">
        <div className="profile-picture-container d-flex flex-column align-items-center">
          {profileData && profileData.image ? (
            <Image src={newImage || profileData.image} alt="Profile" className="profile-picture" roundedCircle style={{ width: '200px', height: '200px' }} />
          ) : (
            <Image src="/images/default-profile-pic.png" roundedCircle style={{ width: '200px', height: '200px' }} />
          )}
          <h2 className="mt-3">{profileData ? `${profileData.firstName} ${profileData.lastName}` : 'Name'}</h2>
          <Button variant="link" onClick={() => setShowModal(true)}>Edit Profile</Button>
        </div>
        <h3>About Me</h3>
        <p>{profileData ? profileData.bio : ''}</p>
      </Card>
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
