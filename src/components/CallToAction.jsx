// src/components/CallToAction.jsx
import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    // CHANGE 1: Removed 'bg-yellow-500' to make the background transparent
    <section className="py-20 text-center text-white">
      <h2 className="text-3xl font-bold mb-6">Ready to Start Your Project?</h2>
      <p className="mb-6">Contact us today and let’s build your dream property!</p>
      
      {/* CHANGE 2: Updated the button to be blue with white text */}
      <Link
        to="/contact"
        className="inline-block border-2 border-indigo-400 text-indigo-400 font-bold py-2 px-6 rounded-lg hover:bg-indigo-400 hover:text-white transition duration-300"
      >
        Contact Us
      </Link>
    </section>
  );
};

export default CallToAction;