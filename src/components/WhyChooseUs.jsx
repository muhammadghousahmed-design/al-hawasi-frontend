// src/components/WhyChooseUs.jsx
import React from 'react';
import whyChooseUsData from '../data/whyChooseUsData.jsx';

const WhyChooseUs = () => {
  return (
    <section className="py-20 text-center">
      {/* CHANGE: Removed 'bg-white' to make the background transparent */}
      <h2 className="text-3xl font-semibold mb-10">Why Choose Us</h2>
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {whyChooseUsData.map((reason) => (
          // CHANGE: Added a semi-transparent card background for readability
          <div key={reason.id} className="bg-transparent bg-opacity-90 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-center">
            {/* CHANGE: Added the icon */}
            <div className="text-indigo-600 text-xl mb-4 flex justify-center">
              {reason.icon}
            </div>
            <h3 className="font-bold text-2xl mb-3">{reason.title}</h3>
            {/* CHANGE: Used the unique description from the data file */}
            <p className="text-indigo-400 text-xl">{reason.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;