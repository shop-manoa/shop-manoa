import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { ItemsList } from '../../api/items/ListItems';

const UserHome = () => {
  const [favoriteItems, setFavoriteItems] = useState([]);

  useEffect(() => {
    const fetchFavoriteItems = async () => {
      try {
        // Fetch favorite items for the current user
        const response = await fetch('/api/favoriteItems'); // Assuming you have an API endpoint for fetching favorite items
        if (!response.ok) {
          throw new Error('Failed to fetch favorite items');
        }
        const favoriteItemsData = await response.json();
        setFavoriteItems(favoriteItemsData);
      } catch (error) {
        console.error('Error fetching favorite items:', error);
        // Handle the error
      }
    };

    // Call the function to fetch favorite items when component mounts
    fetchFavoriteItems();

    // Clean up function
    return () => {
      // Any cleanup code if needed
    };
  }, []);

  return (
    <Container id="userhome-page" fluid className="pt-3">
      <Row xs={1} md={3} className="g-4">
        {favoriteItems.map((item) => (
          <Col key={item._id}>
            <Card>
              <Card.Img variant="top" src={item.image} style={{ width: '100px', height: '100px' }} />
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>{item.description}</Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">{item.category} - {item.condition} - ${item.price}</small>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default UserHome;
