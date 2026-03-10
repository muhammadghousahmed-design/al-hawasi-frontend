// src/components/ServicesCard.jsx
import React from 'react';

// 1. Add 'image' to the list of props
const ServicesCard = ({ title, description, image }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-xl transition">
      {/* 2. Add the image at the top of the card */}
      <div className="mb-4">
        <img 
          src={image} 
          alt={title} // Good for accessibility
          className="w-full h-48 object-cover rounded-md"
        />
      </div>

      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default ServicesCard;