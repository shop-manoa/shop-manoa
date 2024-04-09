import React, { useState } from 'react';
import { Col, Container, Row, Form, Button } from 'react-bootstrap';

const UserProfileSchema = {
  profilePicture: String,
  bio: String,
  sellingList: [String],
};

const ProfilePage = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [bio, setBio] = useState('');
  const [sellingItem, setSellingItem] = useState('');
  const [sellingList, setSellingList] = useState([]);
  const [lookingForItem, setLookingForItem] = useState('');
  const [lookingForList, setLookingForList] = useState([]);

  const handlePictureUpload = (event) => {
    const file = event.target.files[0];
    setProfilePicture(URL.createObjectURL(file));
  };

  const handleAddSellingItem = () => {
    if (sellingItem.trim() !== '') {
      setSellingList([...sellingList, sellingItem]);
      setSellingItem('');
    }
  };

  const handleAddLookingForItem = () => {
    if (lookingForItem.trim() !== '') {
      setLookingForList([...lookingForList, lookingForItem]);
      setLookingForItem('');
    }
  };

  return (
      <Container>
        <Row>
          <Col md={4}>
            <div className="profile-picture-container">
              <label htmlFor="profile-picture" className="profile-picture-placeholder">
                {profilePicture ? (
                    <div className="profile-picture" style={{ backgroundImage: `url(${profilePicture})` }}></div>
                ) : (
                    <div className="placeholder">Upload Photo</div>
                )}
              </label>
              <input type="file" id="profile-picture" onChange={handlePictureUpload} style={{ display: 'none' }} />
            </div>
          </Col>
          <Col md={8}>
            <Form.Group>
              <Form.Label>Bio</Form.Label>
              <Form.Control
                  as="textarea"
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>List of items for sale</Form.Label>
              <Form.Control
                  type="text"
                  value={sellingItem}
                  onChange={(e) => setSellingItem(e.target.value)}
              />
              <Button onClick={handleAddSellingItem}>Add Item</Button>
              <ul>
                {sellingList.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
              </ul>
            </Form.Group>
            <Form.Group>
              <Form.Label>List of items looking for</Form.Label>
              <Form.Control
                  type="text"
                  value={lookingForItem}
                  onChange={(e) => setLookingForItem(e.target.value)}
              />
              <Button onClick={handleAddLookingForItem}>Add Item</Button>
              <ul>
                {lookingForList.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
              </ul>
            </Form.Group>
          </Col>
        </Row>
      </Container>
  );
};

export default ProfilePage;
