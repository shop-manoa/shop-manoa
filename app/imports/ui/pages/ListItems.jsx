import React from 'react';
import ItemList from './ItemList';

const ListItems = () => {
  const items = ItemList(); // Call the ItemList component as a function to fetch items

  return (
      <div>
        <h2>List of Products</h2>
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
          {items.map((item, index) => (
              <tr key={index}>
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
      </div>
  );
};

export default ListItems;
