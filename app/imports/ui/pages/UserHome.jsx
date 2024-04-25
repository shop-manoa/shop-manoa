import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import ItemListing from '../components/ItemListing';
import { getFavoriteItems } from '../../api/items/FavoriteItems'; // Assuming you have a method to fetch favorite items

/* A simple static component to render some text for the landing page. */
const UserHome = () => {
  const [favoriteItems, setFavoriteItems] = useState([]);

  useEffect(() => {
    // Fetch favorite items when component mounts
    fetchFavoriteItems();
  }, []);

  const fetchFavoriteItems = async () => {
    try {
      // Fetch favorite items from the database
      const favorites = await getFavoriteItems(); // You need to implement this method
      setFavoriteItems(favorites);
    } catch (error) {
      console.error('Error fetching favorite items:', error);
    }
  };

  return (
    <Container id="userhome-page" fluid className="pt-3">
      <Row>
        {/* Render favorite items */}
        {favoriteItems.map((item) => (
          <ItemListing key={item._id} item={item} />
        ))}
      </Row>
    </Container>
  );
};

export default UserHome;
