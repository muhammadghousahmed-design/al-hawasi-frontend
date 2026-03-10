import React, { useState } from 'react';
const ContactForm = ({ propertyTitle }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: propertyTitle ? `I'm interested in the property: ${propertyTitle}` : '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = (e) => {
  e.preventDefault();
  // This is the simplest way to handle a form without a backend.
  // It opens the user's default email client.
  const mailtoLink = `mailto:your-email@al-hawasi.com?subject=Inquiry from ${formData.name}&body=${encodeURIComponent(
    `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nMessage:\n${formData.message}`
  )}`;
  window.location.href = mailtoLink;
};

return (
  <form onSubmit={handleSubmit} className="space-y-4">
    <div>
      <label htmlFor="name" className="block text-sm font-medium text-gray-500">Name</label>
      <input 
        type="text" 
        id="name" 
        name="name" 
        required 
        value={formData.name} 
        onChange={handleChange}
        // LOOK HERE: This class controls the text color inside the input
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white bg-opacity-20 text-gray-700 placeholder-gray-300" 
      />
    </div>
    <div>
      <label htmlFor="email" className="block text-sm font-medium text-gray-500">Email</label>
      <input 
        type="email" 
        id="email" 
        name="email" 
        required 
        value={formData.email} 
        onChange={handleChange}
        // AND HERE: text-white makes the typed text white
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white bg-opacity-20 text-gray-700 placeholder-gray-300" 
      />
    </div>
    <div>
      <label htmlFor="phone" className="block text-sm font-medium text-gray-500">Phone</label>
      <input 
        type="tel" 
        id="phone" 
        name="phone" 
        value={formData.phone} 
        onChange={handleChange}
        // AND HERE: text-white makes the typed text white
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white bg-opacity-20 text-gray-700 placeholder-gray-300" 
      />
    </div>
    <div>
      <label htmlFor="message" className="block text-sm font-medium text-gray-500">Message</label>
      <textarea 
        id="message" 
        name="message" 
        rows="4" 
        required 
        value={formData.message} 
        onChange={handleChange}
        // AND HERE: text-white makes the typed text white
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white bg-opacity-20 text-gray-700 placeholder-gray-300"
      ></textarea>
    </div>
    <button type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300">
      Send Inquiry
    </button>
  </form>
  );
};

export default ContactForm;