// client/src/pages/Listings.jsx
import React, { useState, useEffect, useContext } from 'react';
import { fetchAllListings, deleteListing } from '../api/listings';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

function Listings() {
  const [listings, setListings] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    loadListings();
  }, []);

  const loadListings = async () => {
    try {
      const data = await fetchAllListings();
      setListings(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteListing(id);
      loadListings();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>All Car Listings</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {listings.map((listing) => (
          <li
            key={listing.id}
            style={{
              marginBottom: '20px',
              paddingBottom: '10px',
              borderBottom: '1px solid black'
            }}
          >
            <Link to={`/listings/${listing.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <strong>
                {listing.make} {listing.model} ({listing.year})
              </strong>{' '}
              - ${listing.price}
              <br />
              Mileage: {listing.mileage} miles
              <br />
              Seller: {listing.seller_email}
              <br />
              <small>{listing.description}</small>
            </Link>
            {/* Display images thumbnail */}
            {listing.images && listing.images.length > 0 && (
              <div style={{ marginTop: '10px' }}>
                {listing.images.map((img, index) => (
                  <img
                    key={index}
                    src={`http://localhost:5000/${img}`}
                    alt={`${listing.make} ${listing.model} ${index + 1}`}
                    style={{ width: '100px', marginRight: '10px' }}
                  />
                ))}
              </div>
            )}
            {/* Show delete button only if the logged-in user is the seller */}
            {user && user.id === listing.seller_id && (
              <button onClick={() => handleDelete(listing.id)} style={{ marginTop: '10px' }}>
                Delete
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Listings;