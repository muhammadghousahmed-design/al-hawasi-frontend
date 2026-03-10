// src/pages/PropertyDetails.jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPropertyById } from '../services/api'; // ← Import from api.js
import ContactForm from '../components/ContactForm';

const PropertyDetails = () => {
  const { id } = useParams(); // id from URL: /properties/:id

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const data = await getPropertyById(id);
        setProperty(data);
      } catch (err) {
        console.error('Error fetching property:', err);
        setError('Property not found or server error. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading property details...</p>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-red-600">{error || 'Property not found'}</h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Main Image */}
      <div className="mb-8">
        {/* Real image placeholder – later replace with Cloudinary URL */}
        <div className="w-full h-96 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center shadow-xl">
          <span className="text-gray-500 text-2xl font-medium">
            {property.type} Image – Coming Soon
          </span>
        </div>
      </div>

      {/* Property Info */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {property.title}
        </h1>

        <p className="text-3xl font-bold text-green-700 mb-4">
          PKR {property.price.toLocaleString()}
        </p>

        <p className="text-xl text-gray-700 mb-6">
          {property.location}
        </p>

       {/* Key Details */}
<div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 text-center">
  {property.type && (
    <div className="p-4 rounded-lg border border-black bg-gray-50">
      <p className="text-sm text-gray-600">Type</p>           {/* ← back to gray-600 */}
      <p className="text-xl font-semibold text-gray-600">{property.type}</p>  {/* ← back to gray-600 */}
    </div>
  )}
  {property.bedrooms && (
    <div className="p-4 rounded-lg border border-black bg-gray-50">
      <p className="text-sm text-gray-600">Beds</p>
      <p className="text-xl font-semibold text-gray-600">{property.bedrooms}</p>
    </div>
  )}
  {property.bathrooms && (
    <div className="p-4 rounded-lg border border-black bg-gray-50">
      <p className="text-sm text-gray-600">Baths</p>
      <p className="text-xl font-semibold text-gray-600">{property.bathrooms}</p>
    </div>
  )}
  {property.area && (
    <div className="p-4 rounded-lg border border-black bg-gray-50">
      <p className="text-sm text-gray-600">Area</p>
      <p className="text-xl font-semibold text-gray-600">
        {property.area} {property.type === 'Plot' ? 'sq yd' : 'sq ft'}
      </p>
    </div>
  )}
</div>

        {/* Description */}
        {property.description && (
          <div className="mb-10">
            <h3 className="text-2xl font-semibold mb-4">Description</h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {property.description}
            </p>
          </div>
        )}

        {/* Contact Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <a
            href="tel:+923001234567"
            className="flex-1 bg-green-600 text-white text-center py-4 rounded-lg font-semibold hover:bg-green-700 transition text-lg"
          >
            Call Now
          </a>

          <a
            href="https://wa.me/923001234567"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-green-500 text-white text-center py-4 rounded-lg font-semibold hover:bg-green-600 transition text-lg"
          >
            WhatsApp
          </a>
        </div>

        {/* Contact Form */}
        <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            Inquire About This Property
          </h2>
          <ContactForm propertyTitle={property.title} />
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;