// src/pages/Properties.jsx
// src/pages/Properties.jsx
import React, { useState, useEffect } from 'react';
import PropertyCard from "../components/propertycard.jsx";
import { getProperties } from '../services/api'; // ← Import from your api.js

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllProperties = async () => {
      try {
        const data = await getProperties(); // ← Fetches ALL properties from backend
        setProperties(data);
      } catch (err) {
        console.error('Error fetching properties:', err);
        setError('Unable to load properties. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchAllProperties();
  }, []);

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-12">
        Available Properties
      </h1>

      {loading ? (
        <div className="text-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading available properties...</p>
        </div>
      ) : error ? (
        <div className="text-center py-20">
          <p className="text-xl text-red-600">{error}</p>
        </div>
      ) : properties.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl text-gray-500">
            No properties are available at the moment. Please check back later!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <PropertyCard
              key={property._id}           // ← Use MongoDB _id as key
              id={property._id}            // ← Pass real _id
              title={property.title}
              price={property.price}
              location={property.location}
              type={property.type}
              // image={property.image}    // ← Uncomment later when images are added
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Properties;