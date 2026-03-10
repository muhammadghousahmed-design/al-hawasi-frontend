// src/components/ServicesPreview.jsx
import React from 'react';
// 1. Import the correct data from your servicesData.js file
import servicesData from '../data/servicesData.js';

const ServicesPreview = () => {
  return (
    <section className="py-20 text-center">
      {/* We can remove the bg-white class since the main layout handles background */}
      <h2 className="text-3xl font-semibold mb-10">Our Services</h2>
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {/* 2. Map over the new servicesData array */}
        {servicesData.map((service) => (
          // 3. Use a more structured card design
          <div key={service.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            {/* 4. Add the image! */}
            <div className="mb-4">
              <img 
                src={service.image} 
                alt={service.title}
                className="w-full h-40 object-cover rounded-md"
              />
            </div>
            
            {/* 5. Use the specific title and description from the data */}
            <h3 className="font-bold text-xl mb-2">{service.title}</h3>
            <p className="text-gray-600">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesPreview;