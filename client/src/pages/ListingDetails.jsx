// client/src/pages/ListingDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ImageModal from '../components/ImageModal';

function ListingDetails() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/listings/${id}`);
        setListing(response.data);
      } catch (err) {
        console.error(err);
        setError('Error fetching listing details.');
      }
    };
    fetchListing();
  }, [id]);

  if (error) return <div>{error}</div>;
  if (!listing) return <div>Loading...</div>;

  const openModal = (index) => {
    setCurrentImageIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const showPrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? listing.images.length - 1 : prevIndex - 1
    );
  };

  const showNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === listing.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div>
      <h2>
        {listing.make} {listing.model} ({listing.year})
      </h2>
      <p><strong>Price:</strong> ${listing.price}</p>
      <p><strong>Mileage:</strong> {listing.mileage} miles</p>
      <p><strong>Transmission:</strong> {listing.transmission}</p>
      <p><strong>Fuel Type:</strong> {listing.fuelType}</p>
      <p><strong>Body Type:</strong> {listing.bodyType}</p>
      <p><strong>Color:</strong> {listing.color}</p>
      <p><strong>Description:</strong> {listing.description}</p>
      <p><strong>Seller:</strong> {listing.seller_email}</p>
      {listing.images && listing.images.length > 0 && (
        <div>
          <h3>Images:</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {listing.images.map((img, index) => (
              <img
                key={index}
                src={`http://localhost:5000/${img}`}
                alt={`${listing.make} ${listing.model} ${index + 1}`}
                style={{ width: '200px', marginRight: '10px', cursor: 'pointer' }}
                onClick={() => openModal(index)}
              />
            ))}
          </div>
        </div>
      )}
      {modalOpen && (
        <ImageModal
          images={listing.images.map((img) => `http://localhost:5000/${img}`)}
          currentIndex={currentImageIndex}
          onClose={closeModal}
          onPrev={showPrevImage}
          onNext={showNextImage}
        />
      )}
    </div>
  );
}

export default ListingDetails;