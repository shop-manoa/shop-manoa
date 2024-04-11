import React, { useState, useEffect } from 'react';
import { Stuffs } from '../../api/stuff/Stuff';

const ListItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const fetchedItems = await Stuffs.collection.find().fetch();
        setItems(fetchedItems);
      } catch (error) {
        console.error('Error fetching items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  return (
      <div>
        <h2>List of Products</h2>
        {loading ? (
            <p>Loading...</p>
        ) : (
            <table>
              <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Image</th>
                <th>Category</th>
                <th>Condition</th>
                <th>Price</th>
              </tr>
              </thead>
              <tbody>
              {items.map((item) => (
                  <tr key={item._id}>
                    <td>{item.title}</td>
                    <td>{item.description}</td>
                    <td><img src={item.image} alt={item.title} style={{ width: '50px', height: '50px' }} /></td>
                    <td>{item.category}</td>
                    <td>{item.condition}</td>
                    <td>{item.price}</td>
                  </tr>
              ))}
              </tbody>
            </table>
        )}
      </div>
  );
};

export default ListItems;
