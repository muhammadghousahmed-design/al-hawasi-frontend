// src/components/propertycard.jsx
import { Link } from 'react-router-dom';

const PropertyCard = ({ id, title, price, location, type, image }) => {
  return (
    <Link 
      to={`/properties/${id}`}
      className="block hover:shadow-2xl transition duration-300"
      onClick={() => console.log('Navigating to detail:', `/properties/${id}`)} // ← debug
    >
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {image ? (
          <img src={image} alt={title} className="w-full h-48 object-cover" />
        ) : (
          <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500 text-lg font-medium">No Image</span>
          </div>
        )}
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2 line-clamp-2">{title}</h3>
          <p className="text-gray-600 mb-3 line-clamp-2">{location}</p>
          <p className="text-2xl font-bold text-indigo-700 mb-4">
            PKR {price.toLocaleString()}
          </p>
          <p className="text-sm text-gray-500 mb-4">{type}</p>
          <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition">
             {(e) => e.preventDefault()}
            View Details
          </button>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;


