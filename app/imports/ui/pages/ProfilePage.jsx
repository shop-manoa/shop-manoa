import React, { useState } from 'react';
import { Col, Container, Row, Form, Button } from 'react-bootstrap';

// Define a schema for user profile

const ProfilePage = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [sellingItem, setSellingItem] = useState('');
  const [sellingList, setSellingList] = useState([]);
  const [lookingForItem, setLookingForItem] = useState('');
  const [lookingForList, setLookingForList] = useState([]);

  // Function to handle profile picture upload
  const handlePictureUpload = (event) => {
    const file = event.target.files[0];
    // Handle file upload logic here
    setProfilePicture(URL.createObjectURL(file));
  };

  // Function to handle adding items to selling list
  const handleAddSellingItem = () => {
    if (sellingItem.trim() !== '') {
      setSellingList([...sellingList, sellingItem]);
      setSellingItem('');
    }
  };

  // Function to handle adding items to looking for list
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
          <div className="profile-picture">
            <img src={profilePicture} alt="Profile" />
            <input type="file" onChange={handlePictureUpload} />
            <div className="profile-picture-container">
              <label htmlFor="profile-picture" className="profile-picture-placeholder">
                {profilePicture ? (
                  <div className="profile-picture" style={{ backgroundImage: `url(${profilePicture})` }} />
                ) : (
                  <div className="placeholder">Upload Photo</div>
                )}
              </label>
              <input type="file" id="profile-picture" onChange={handlePictureUpload} style={{ display: 'none' }} />
            </div>
          </div>
        </Col>
        <Col md={8}>
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
