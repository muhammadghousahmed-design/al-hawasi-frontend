// src/pages/AdminDashboard.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [properties, setProperties] = useState([]);
  const [formData, setFormData] = useState({
    title: '', description: '', price: '', location: '', type: 'House',
    bedrooms: '', bathrooms: '', area: '', isFeatured: false
  });
  const [images, setImages] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    if (!token) {
      navigate('/admin/login');
      return;
    }

    const fetchProperties = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/properties', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProperties(res.data);
      } catch (err) {
        console.error(err);
        if (err.response?.status === 401 || err.response?.status === 403) {
          localStorage.removeItem('adminToken');
          navigate('/admin/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (images.length) {
      images.forEach(file => data.append('images', file));
    }

    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/properties/${editingId}`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
      } else {
        await axios.post('http://localhost:5000/api/properties', data, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
      }

      // Refresh list
      const res = await axios.get('http://localhost:5000/api/properties', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProperties(res.data);

      // Reset form
      setFormData({
        title: '', description: '', price: '', location: '', type: 'House',
        bedrooms: '', bathrooms: '', area: '', isFeatured: false
      });
      setImages([]);
      setEditingId(null);
    } catch (err) {
      console.error(err);
      alert('Failed to save property');
    }
  };

  const handleEdit = (prop) => {
    setFormData({
      title: prop.title,
      description: prop.description || '',
      price: prop.price,
      location: prop.location,
      type: prop.type,
      bedrooms: prop.bedrooms || '',
      bathrooms: prop.bathrooms || '',
      area: prop.area || '',
      isFeatured: prop.isFeatured
    });
    setEditingId(prop._id);
    setImages([]);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this property?')) return;

    try {
      await axios.delete(`http://localhost:5000/api/properties/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProperties(properties.filter(p => p._id !== id));
    } catch (err) {
      console.error(err);
      alert('Failed to delete');
    }
  };

  if (!token) return null;

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900">Admin Dashboard</h1>
          <button
            onClick={() => {
              localStorage.removeItem('adminToken');
              navigate('/admin/login');
            }}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        {/* Form – Add / Edit */}
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-xl mb-16">
          <h2 className="text-2xl font-bold mb-6">
            {editingId ? 'Edit Property' : 'Add New Property'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2">Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
                placeholder="Enter property title"
                className="w-full border p-3 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Price (PKR) *</label>
              <input
                type="number"
                value={formData.price}
                onChange={e => setFormData({...formData, price: e.target.value})}
                placeholder="Enter price"
                className="w-full border p-3 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Location *</label>
              <input
                type="text"
                value={formData.location}
                onChange={e => setFormData({...formData, location: e.target.value})}
                placeholder="e.g. DHA Phase 8, Karachi"
                className="w-full border p-3 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Type *</label>
              <select
                value={formData.type}
                onChange={e => setFormData({...formData, type: e.target.value})}
                className="w-full border p-3 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="House">House</option>
                <option value="Apartment">Apartment</option>
                <option value="Plot">Plot</option>
                <option value="Commercial">Commercial</option>
                <option value="Farmhouse">Farmhouse</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Bedrooms</label>
              <input
                type="number"
                value={formData.bedrooms}
                onChange={e => setFormData({...formData, bedrooms: e.target.value})}
                placeholder="e.g. 5"
                className="w-full border p-3 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Bathrooms</label>
              <input
                type="number"
                value={formData.bathrooms}
                onChange={e => setFormData({...formData, bathrooms: e.target.value})}
                placeholder="e.g. 6"
                className="w-full border p-3 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Area (sq ft/yd)</label>
              <input
                type="number"
                value={formData.area}
                onChange={e => setFormData({...formData, area: e.target.value})}
                placeholder="e.g. 1000"
                className="w-full border p-3 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                placeholder="Enter detailed description..."
                className="w-full border p-3 rounded-lg h-32 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-2">Images</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={e => setImages([...e.target.files])}
                className="w-full border p-3 rounded-lg text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              />
              <p className="text-sm text-gray-500 mt-1">
                {images.length > 0 ? `${images.length} file(s) selected` : 'No files chosen'}
              </p>
            </div>

            <div className="flex items-center gap-2 md:col-span-2">
              <input
                type="checkbox"
                checked={formData.isFeatured}
                onChange={e => setFormData({...formData, isFeatured: e.target.checked})}
                className="h-5 w-5 text-indigo-600 focus:ring-indigo-500"
              />
              <label className="text-gray-700">Mark as Featured</label>
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-indigo-700 transition"
            >
              {editingId ? 'Update Property' : 'Add Property'}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setFormData({
                    title: '', description: '', price: '', location: '', type: 'House',
                    bedrooms: '', bathrooms: '', area: '', isFeatured: false
                  });
                  setImages([]);
                  setEditingId(null);
                }}
                className="bg-gray-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-gray-600 transition"
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>

        {/* List of Properties */}
        <h2 className="text-3xl font-bold mb-8">Manage Properties</h2>

        {properties.length === 0 ? (
          <p className="text-center text-gray-600 py-10">No properties found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map(prop => (
              <div key={prop._id} className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-bold mb-2">{prop.title}</h3>
                <p className="text-gray-600 mb-2">{prop.location} • {prop.type}</p>
                <p className="text-2xl font-bold text-green-700 mb-4">
                  PKR {prop.price.toLocaleString()}
                </p>
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => handleEdit(prop)}
                    className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(prop._id)}
                    className="bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;