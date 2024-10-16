import React, { useState } from 'react';

const PropertyForm = () => {
  const [formData, setFormData] = useState({
    area: '',
    bedrooms: 1,
    bathrooms: 1,
    unitType: 'Apartment',
    location: 'Palm Jumeirah'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    // Handle form submission logic (e.g., API call)
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url('https://source.unsplash.com/random/?beach,coast')` }}>
      <div className="bg-gray-800 bg-opacity-70 p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h1 className="text-3xl text-white font-bold mb-6 text-center">🏡 Property Price Prediction</h1>
        <h2 className="text-xl text-white mb-4">Property Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-200 mb-2" htmlFor="area">Area (in Sqft)</label>
            <input
              type="number"
              id="area"
              name="area"
              value={formData.area}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
              placeholder="Enter area in sqft"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-200 mb-2" htmlFor="bedrooms">Number of Bedrooms</label>
            <input
              type="number"
              id="bedrooms"
              name="bedrooms"
              value={formData.bedrooms}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
              min="1"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-200 mb-2" htmlFor="bathrooms">Number of Bathrooms</label>
            <input
              type="number"
              id="bathrooms"
              name="bathrooms"
              value={formData.bathrooms}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
              min="1"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-200 mb-2" htmlFor="unitType">Unit Type</label>
            <select
              id="unitType"
              name="unitType"
              value={formData.unitType}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
            >
              <option value="Apartment">Apartment</option>
              <option value="Villa">Villa</option>
              <option value="Penthouse">Penthouse</option>
            </select>
          </div>
          <div className="mb-6">
            <label className="block text-gray-200 mb-2" htmlFor="location">Location</label>
            <select
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
            >
              <option value="Palm Jumeirah">Palm Jumeirah</option>
              <option value="Downtown Dubai">Downtown Dubai</option>
              <option value="Dubai Marina">Dubai Marina</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded"
          >
            Predict Price
          </button>
        </form>
      </div>
    </div>
  );
};

export default PropertyForm;
