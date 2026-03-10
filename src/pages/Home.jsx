// src/pages/Home.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getFeaturedProperties } from '../services/api'; // ← new import

import ServicesPreview from "../components/ServicesPreview";
import WhyChooseUs from "../components/WhyChooseUs";
import CallToAction from "../components/CallToAction";

const Home = () => {
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const data = await getFeaturedProperties();
        setFeaturedProperties(data);
      } catch (err) {
        setError('Unable to load featured properties right now.');
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  return (
    <div className="space-y-20">
      {/* --- Hero Section (unchanged) --- */}
      <section>
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-32">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            {/* Left Side: Text Content */}
            <div className="md:w-1/2 text-center md:text-left">
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
                Building Dreams, One Home at a Time.
              </h1>
              <p className="text-lg md:text-xl text-gray-50 mb-8">
                Your trusted partner for construction and real estate. We deliver quality and reliability in every project.
              </p>
              <a 
                href="/properties" 
                className="inline-block border-2 border-indigo-400 text-indigo-400 font-bold py-2 px-6 rounded-lg hover:bg-indigo-400 hover:text-white transition duration-300"
              >
                View Our Properties
              </a>
            </div>
            {/* Right Side: Image */}
            <div className="md:w-1/2">
              <img 
                src="/images/house-bg.jpg"
                alt="Modern Family Home" 
                className="rounded-lg shadow-2xl object-cover w-full h-96"
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- About Us Section (unchanged) --- */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2 order-2 md:order-1">
            <img 
              src="/images/modran.jpg"
              alt="Our Team" 
              className="rounded-lg shadow-xl object-cover w-full h-80"
            />
          </div>
          <div className="md:w-1/2 text-center md:text-left order-1 md:order-2">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">About Al-Hawasi</h2>
            <p className="text-gray-50 mb-6">
              With over a decade of experience, Al-Hawasi has become a cornerstone of the community. We specialize in building high-quality homes and developing properties that families can grow in.
            </p>
            <p className="text-gray-50 mb-8">
              Our commitment to quality, reliability, and customer satisfaction ensures that your dream home is in the safest hands.
            </p>
            <a 
              href="/about" 
              className="inline-block border-2 border-indigo-400 text-indigo-400 font-bold py-2 px-6 rounded-lg hover:bg-indigo-400 hover:text-white transition duration-300"
            >
              Learn More About Us
            </a>
          </div>
        </div>
      </section>

      {/* --- Featured Properties Section (NEW – real data) --- */}
      <section className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
          Featured Properties
        </h2>

        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-400 mx-auto"></div>
            <p className="mt-4 text-gray-300">Loading featured properties...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20 text-red-400 text-xl">
            {error}
          </div>
        ) : featuredProperties.length === 0 ? (
          <div className="text-center py-20 text-gray-300 text-xl">
            No featured properties available right now.
          </div>
        ) : (
          // === PASTE THIS NEW CODE IN Home.jsx ===

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {featuredProperties.map((property) => (
    <Link 
      to={`/properties/${property._id}`} 
      key={property._id}
      className="block" // This makes the entire card area clickable
    >
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden hover:border-indigo-400/50 transition-all duration-300">
        {/* Image placeholder */}
        <div className="h-56 bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
          <span className="text-gray-400 text-lg">Image Coming Soon</span>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
            {property.title}
          </h3>
          <p className="text-gray-300 mb-4 line-clamp-2">
            {property.description || 'No description'}
          </p>

          <div className="flex justify-between items-center mb-4">
            <span className="text-2xl font-bold text-green-400">
              PKR {property.price.toLocaleString()}
            </span>
            <span className="text-sm text-gray-300">
              {property.type}
            </span>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-gray-200 mb-6">
            {property.bedrooms && <span>{property.bedrooms} Beds</span>}
            {property.bathrooms && <span>{property.bathrooms} Baths</span>}
            {property.area && <span>{property.area} sq ft/yd</span>}
          </div>

          
        </div>
      </div>
    </Link>
  ))}
</div>
        )}
      </section>

      {/* Keep your other components */}
      <ServicesPreview />
      <WhyChooseUs />
      <CallToAction />
    </div>
  );
};

export default Home;