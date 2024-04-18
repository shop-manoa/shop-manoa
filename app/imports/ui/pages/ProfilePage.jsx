import React, { useState, useEffect } from 'react';
import { Col, Container, Row, Form, Button } from 'react-bootstrap';

const ProfilePage = () => {
  const [profilePicture, setProfilePicture] = useState(localStorage.getItem('profilePicture') || null);
  const [bio, setBio] = useState(localStorage.getItem('bio') || '');
  const [bioChanged, setBioChanged] = useState(false);
  const [sellingItem, setSellingItem] = useState('');
  const [sellingList, setSellingList] = useState(JSON.parse(localStorage.getItem('sellingList')) || []);
  const [sellingListChanged, setSellingListChanged] = useState(false);
  const [lookingForItem, setLookingForItem] = useState('');
  const [lookingForList, setLookingForList] = useState(JSON.parse(localStorage.getItem('lookingForList')) || []);
  const [lookingForListChanged, setLookingForListChanged] = useState(false);

  useEffect(() => {
    // Save data to local storage whenever it changes
    localStorage.setItem('profilePicture', profilePicture);
    localStorage.setItem('bio', bio);
    localStorage.setItem('sellingList', JSON.stringify(sellingList));
    localStorage.setItem('lookingForList', JSON.stringify(lookingForList));
  }, [profilePicture, bio, sellingList, lookingForList]);

  const handlePictureUpload = (event) => {
    const file = event.target.files[0];
    setProfilePicture(URL.createObjectURL(file));
  };

  const handleAddSellingItem = () => {
    if (sellingItem.trim() !== '') {
      setSellingList([...sellingList, sellingItem]);
      setSellingItem('');
      setSellingListChanged(true);
    }
  };

  const handleDeleteSellingItem = (index) => {
    const updatedList = sellingList.filter((_, i) => i !== index);
    setSellingList(updatedList);
    setSellingListChanged(true);
  };

  const handleAddLookingForItem = () => {
    if (lookingForItem.trim() !== '') {
      setLookingForList([...lookingForList, lookingForItem]);
      setLookingForItem('');
      setLookingForListChanged(true);
    }
  };

  const handleDeleteLookingForItem = (index) => {
    const updatedList = lookingForList.filter((_, i) => i !== index);
    setLookingForList(updatedList);
    setLookingForListChanged(true);
  };

  const handleBioChange = (e) => {
    setBio(e.target.value);
    setBioChanged(true);
  };

  const handleConfirmBioChanges = () => {
    setBioChanged(false);
  };

  const handleConfirmSellingListChanges = () => {
    setSellingListChanged(false);
  };

  const handleConfirmLookingForListChanges = () => {
    setLookingForListChanged(false);
  };

  return (
      <Container>
        <Row>
          <Col md={4}>
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
          </Col>
          <Col md={8}>
            <Form.Group>
              <Form.Label>Bio</Form.Label>
              <Form.Control
                  as="textarea"
                  rows={3}
                  value={bio}
                  onChange={handleBioChange}
              />
              {bioChanged && (
                  <Button onClick={handleConfirmBioChanges}>Confirm Bio Changes</Button>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label>List of items for sale</Form.Label>
              <Form.Control
                  type="text"
                  value={sellingItem}
                  onChange={(e) => setSellingItem(e.target.value)}
              />
              {sellingItem.trim() !== '' && (
                  <Button onClick={handleAddSellingItem}>Add Item</Button>
              )}
              <ul>
                {sellingList.map((item, index) => (
                    <li key={index}>
                      {item}
                      <Button
                          onClick={() => handleDeleteSellingItem(index)}
                          variant="danger"
                          size="sm"
                          className="delete-button"
                      >
                        Delete
                      </Button>
                    </li>
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
              {lookingForItem.trim() !== '' && (
                  <Button onClick={handleAddLookingForItem}>Add Item</Button>
              )}
              <ul>
                {lookingForList.map((item, index) => (
                    <li key={index}>
                      {item}
                      <Button
                          onClick={() => handleDeleteLookingForItem(index)}
                          variant="danger"
                          size="sm"
                          className="delete-button"
                      >
                        Delete
                      </Button>
                    </li>
                ))}
              </ul>
            </Form.Group>
          </Col>
        </Row>
      </Container>
  );
};

export default ProfilePage;
