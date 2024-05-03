import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import ItemListing from '../components/ItemListing';
import { Meteor } from 'meteor/meteor';
import { ItemsList } from '../../api/items/ListItems'; // Importing ItemsList

const UserHome = () => {
  const [favoriteItems, setFavoriteItems] = useState([]);

  useEffect(() => {
    // Fetch favorite items when component mounts
    const subscription = Meteor.subscribe(ItemsList.userPublicationName);
    subscription.ready(() => {
      // Assuming ItemsList.collection.find() fetches the items from the publication
      const favorites = ItemsList.collection.find().fetch();
      setFavoriteItems(favorites);
    });

    // Clean up subscription when component unmounts
    return () => {
      subscription.stop();
    };
  }, []);

  // Function to handle toggling favorite status
  const toggleFavorite = (itemId) => {
    // Toggle favorite status locally
    setFavoriteItems(prevItems => {
      return prevItems.map(item => {
        if (item._id === itemId) {
          return { ...item, favorited: !item.favorited };
        }
        return item;
      });
    });

    // Update favoritedBy field in the database
    const item = ItemsList.collection.findOne(itemId);
    const favorited = !item.favorited;
    ItemsList.collection.update({ _id: itemId }, { $set: { favoritedBy: favorited ? Meteor.user().username : null } });
  };

  return (
      <Container id="userhome-page" fluid className="pt-3">
        <Row>
          {/* Render favorite items */}
          {favoriteItems.map((item) => (
              <ItemListing key={item._id} item={item} toggleFavorite={toggleFavorite} />
          ))}
        </Row>
      </Container>
  );
};

export default UserHome;
