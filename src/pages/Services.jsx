// src/pages/Services.jsx
import ServicesCard from "../components/ServicesCard";
import servicesData from "../data/servicesData.js"; // <-- Import the data

const Services = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-12">
        Our Construction Services
      </h1>

      {/* Use the same responsive grid as your Properties page */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Map over the data and render a card for each service */}
        {servicesData.map((service) => (
          <ServicesCard
            key={service.id}
            title={service.title}
            description={service.description}
            image={service.image} // <-- Pass the image prop
          />
        ))}
      </div>
    </div>
  );
};

export default Services;