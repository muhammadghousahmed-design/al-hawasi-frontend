import React from 'react';
import ContactForm from '../components/ContactForm';

const Contact = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Contact Us</h1>
      <div className="max-w-2xl mx-auto">
        <p className="text-center font-bold text-black-600 mb-8">
          Have a question or want to work with us? Reach out using the form below.
        </p>
        <ContactForm />
      </div>
    </div>
  );
};

export default Contact;
