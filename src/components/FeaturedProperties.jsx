// src/components/FeaturedProperties.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getFeaturedProperties } from '../services/api'; // ← Import from your api.js

const FeaturedProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const data = await getFeaturedProperties(); // ← Fetches only featured ones
        setProperties(data);
      } catch (err) {
        console.error('Failed to fetch featured properties:', err);
        setError('Unable to load featured properties right now.');
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

// In src/components/FeaturedProperties.jsx

return (
  <div style={{ backgroundColor: 'magenta', padding: '50px', border: '5px solid cyan' }}>
    <h1>This is the FeaturedProperties Component!</h1>
    <p>If you can see this, the component is working.</p>
    <p>Loading: {loading.toString()}</p>
    <p>Error: {error || 'No Error'}</p>
    <p>Number of Properties: {properties.length}</p>
  </div>
  );
}