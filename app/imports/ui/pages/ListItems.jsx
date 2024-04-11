// ListItems.jsx

import React, { useState } from 'react';

const ListItems = () => {
  // State to manage list of items
  const [items, setItems] = useState([]);

  // State to manage form inputs
  const [product, setProduct] = useState('');
  const [price, setPrice] = useState('');
  const [condition, setCondition] = useState('Good');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add item to the list
    setItems([...items, { product, price, condition, description, photo }]);
    // Clear form inputs
    setProduct('');
    setPrice('');
    setCondition('Good');
    setDescription('');
    setPhoto(null);
  };

  // Function to handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
  };

  return (
      <div>
        <h2>List of Products</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Product:
            <input
                type="text"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
            />
          </label>
          <label>
            Price:
            <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
          </label>
          <label>
            Condition:
            <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
            >
              <option value="Good">Good</option>
              <option value="Damaged">Damaged</option>
              <option value="Used">Used</option>
            </select>
          </label>
          <label>
            Description:
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <label>
            Photo:
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
            />
          </label>
          <button type="submit">Add Item</button>
        </form>
        <table>
          <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Condition</th>
            <th>Description</th>
            <th>Photo</th>
          </tr>
          </thead>
          <tbody>
          {items.map((item, index) => (
              <tr key={index}>
                <td>{item.product}</td>
                <td>{item.price}</td>
                <td>{item.condition}</td>
                <td>{item.description}</td>
                <td>
                  {item.photo && (
                      <img src={URL.createObjectURL(item.photo)} alt="Product" style={{ width: '100px', height: '100px' }} />
                  )}
                </td>
              </tr>
          ))}
          </tbody>
        </table>
      </div>
  );
};

export default ListItems;
