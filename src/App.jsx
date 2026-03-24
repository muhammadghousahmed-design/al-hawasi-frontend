// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";  // ← capital L
import Home from "./pages/Home";
import Services from "./pages/Services";
import Properties from "./pages/Properties";
import AdminLogin from './pages/AdminLogin';   
import AdminDashboard from './pages/AdminDashboard';  
import Contact from "./pages/Contact";
import PropertyDetails from "./pages/PropertyDetails";
import WhatsAppButton from './components/WhatsAppButton';


function App() {
  return (
    <Router>  {/* ← Fixed: Use Router instead of BrowserRouter */}
      {/* 
        This is the new main wrapper. It has the background image.
        - relative: Needed to position the overlay inside it.
        - min-h-screen: Ensures the background always covers at least the full screen height.
      */}
      <div className="relative min-h-screen">
        {/* 
          The background image itself.
          - bg-fixed: The image stays in place while you scroll (parallax effect).
          - bg-cover: The image covers the entire background area.
          - bg-center: The image is centered.
          - bg-no-repeat: The image does not repeat.
        */}
        <div 
  className="fixed inset-0 bg-no-repeat bg-center bg-gray-900/70 z-0"
  style={{ 
    backgroundImage: "url('/images/logo2.jpg')",
    backgroundSize: 'contain',   // or '60%' — contain shows full logo
    backgroundPosition: 'center'
  }}
/>
        {/* 
          The dark overlay. This is VERY important for readability.
          - absolute: Positions it to cover the entire parent div.
          - inset-0: A shortcut for top-0, right-0, bottom-0, left-0.
          - bg-black: A black background color.
          - bg-opacity-60: Makes the black 60% transparent (you can adjust this).
        */}
        <div className="absolute inset-0 bg-black bg-opacity-60 z-10"></div>

        {/* 
          This wrapper holds all your actual content.
          - relative: Allows us to control its stacking order.
          - z-20: Places it ON TOP of the background (z-10) and the image (z-0).
          - text-white: Makes all text white by default, which looks good on a dark background.
        */}
        <div className="relative z-20 text-white">
          
          
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/properties" element={<Properties />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/properties/:id" element={<PropertyDetails />} />
            </Routes>
            <WhatsAppButton />
          
          
        </div>
      </div>
    </Router>  /* ← Fixed: closing tag */
  );
}

export default App;