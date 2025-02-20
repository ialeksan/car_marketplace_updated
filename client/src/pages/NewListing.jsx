// client/src/pages/NewListing.jsx
import React, { useState, useContext } from 'react';
import { createListing } from '../api/listings';
import { AuthContext } from '../context/AuthContext';

function NewListing() {
  const { user } = useContext(AuthContext);
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [mileage, setMileage] = useState('');
  const [price, setPrice] = useState('');
  const [transmission, setTransmission] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [bodyType, setBodyType] = useState('');
  const [color, setColor] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]); // to store File objects
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    // e.target.files is a FileList object; convert it to an array
    setImages([...e.target.files]);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!user) {
      setMessage('You must be logged in to create a listing.');
      return;
    }

    try {
      const listingData = {
        seller_id: user.id,
        make,
        model,
        year: parseInt(year) || 0,
        mileage: parseInt(mileage) || 0,
        price: parseFloat(price.replace(/[^0-9.]/g, '')) || 0,
        transmission,
        fuelType,
        bodyType,
        color,
        description,
        images, // array of File objects
      };
      const data = await createListing(listingData);
      setMessage(`Listing created with ID: ${data.listingId}`);
      // Clear form fields after successful submission
      setMake('');
      setModel('');
      setYear('');
      setMileage('');
      setPrice('');
      setTransmission('');
      setFuelType('');
      setBodyType('');
      setColor('');
      setDescription('');
      setImages([]);
    } catch (err) {
      console.error(err);
      setMessage('Error creating listing');
    }
  };

  return (
    <div>
      <h2>Create a New Listing</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleCreate}>
        <div>
          <label>Make:</label>
          <input value={make} onChange={(e) => setMake(e.target.value)} />
        </div>
        <br />
        <div>
          <label>Model:</label>
          <input value={model} onChange={(e) => setModel(e.target.value)} />
        </div>
        <br />
        <div>
          <label>Year:</label>
          <input value={year} onChange={(e) => setYear(e.target.value)} />
        </div>
        <br />
        <div>
          <label>Mileage:</label>
          <input value={mileage} onChange={(e) => setMileage(e.target.value)} />
        </div>
        <br />
        <div>
          <label>Price:</label>
          <input value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>
        <br />
        <div>
          <label>Transmission:</label>
          <input value={transmission} onChange={(e) => setTransmission(e.target.value)} />
        </div>
        <br />
        <div>
          <label>Fuel Type:</label>
          <input value={fuelType} onChange={(e) => setFuelType(e.target.value)} />
        </div>
        <br />
        <div>
          <label>Body Type:</label>
          <input value={bodyType} onChange={(e) => setBodyType(e.target.value)} />
        </div>
        <br />
        <div>
          <label>Color:</label>
          <input value={color} onChange={(e) => setColor(e.target.value)} />
        </div>
        <br />
        <div>
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <br />
        <div>
          <label>Select Images:</label>
          <input type="file" multiple onChange={handleFileChange} />
        </div>
        <br />
        <button type="submit">Create Listing</button>
      </form>
    </div>
  );
}

export default NewListing;