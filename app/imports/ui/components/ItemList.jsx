import React, { useState, useEffect } from 'react';
import { Stuffs } from '../../api/stuff/Stuff';

const ItemList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Fetch items from the collection and update state
    const fetchItems = async () => {
      const fetchedItems = await Stuffs.collection.find().fetch();
      setItems(fetchedItems);
    };
    fetchItems();
  }, []);

  return items;
};

export default ItemList;
