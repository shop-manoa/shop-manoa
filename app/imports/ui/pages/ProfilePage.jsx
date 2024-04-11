import React, { useState } from 'react';
import { Col, Container, Row, Table, Form, Button } from 'react-bootstrap';

// Define a schema for user profile
const UserProfileSchema = {
  profilePicture: String,
  bio: String,
  sellingList: [String]
};

const ProfilePage = () => {
  const [profilePicture, setProfilePicture] = useState('');
  const [bio, setBio] = useState('');
  const [sellingItem, setSellingItem] = useState('');
  const [sellingList, setSellingList] = useState([]);

  // Function to handle profile picture upload
  const handlePictureUpload = (event) => {
    const file = event.target.files[0];
    // Handle file upload logic here
    setProfilePicture(URL.createObjectURL(file));
  };

  // Function to handle adding items to selling list
  const handleAddItem = () => {
    if (sellingItem.trim() !== '') {
      setSellingList([...sellingList, sellingItem]);
      setSellingItem('');
    }
  };

  return (
      <Container>
        <Row>
          <Col md={4}>
            <div className="profile-picture">
              <img src={profilePicture} alt="Profile" />
              <input type="file" onChange={handlePictureUpload} />
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
              <Button onClick={handleAddItem}>Add Item</Button>
              <ul>
                {sellingList.map((item, index) => (
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
