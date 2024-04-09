import React, { useState } from 'react';
import { Col, Container, Row, Form, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';

const ProfilePage = () => {
  const user = Meteor.user();
  const [bio, setBio] = useState(user.profile && user.profile.bio ? user.profile.bio : '');
  const [sellingItem, setSellingItem] = useState('');
  const [sellingList, setSellingList] = useState([]);
  const [lookingForItem, setLookingForItem] = useState('');
  const [lookingForList, setLookingForList] = useState([]);

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

  const handleSaveBio = () => {
    // Update user profile with new bio
    Meteor.users.update(Meteor.userId(), { $set: { 'profile.bio': bio } });
  };

  return (
      <Container>
        <Row>
          <Col md={4}>
            <div className="profile-picture-container">
              {user.profile && user.profile.pictureUrl ? (
                  <img src={user.profile.pictureUrl} alt="Profile" className="profile-picture" />
              ) : (
                  <div className="placeholder">Upload Photo</div>
              )}
              {/* You may also include the option to upload a new photo here */}
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
              <Button onClick={handleSaveBio}>Save Bio</Button>
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
