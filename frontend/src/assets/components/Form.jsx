import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Placeholder for map marker icon
import markerIconPng from "leaflet/dist/images/marker-icon.png";

const PropertyPricePrediction = () => {
  const [area, setArea] = useState(1000);
  const [bedrooms, setBedrooms] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);
  const [predictedPrice, setPredictedPrice] = useState(null);

  const increment = (value, setter) => {
    setter(value + 1);
  };

  const decrement = (value, setter) => {
    if (value > 1) {
      setter(value - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate a price prediction and show the result
    const price = (area * 150 + bedrooms * 50000 + bathrooms * 30000).toFixed(
      2
    );
    setPredictedPrice(`AED ${price}`);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center"
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1728660977084-93ebeb6f5c87?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
      }}
    >
      {/* Form Section */}
      <div className=" bg-opacity-80 p-8 rounded-xl w-full max-w-lg space-y-6 mb-8">
        <h1 className="text-4xl text-white font-bold text-center">
          🏠 Property Price Prediction
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-white font-medium mb-1">
              Area (in Sqft)
            </label>
            <div className="flex">
              <button
                type="button"
                onClick={() => decrement(area, setArea)}
                className="px-3 py-2 bg-gray-600 text-white rounded-l-md focus:outline-none"
              >
                -
              </button>
              <input
                type="number"
                value={area}
                onChange={(e) => setArea(Number(e.target.value))}
                className="w-full px-4 py-2 text-center bg-gray-700 text-white focus:outline-none"
              />
              <button
                type="button"
                onClick={() => increment(area, setArea)}
                className="px-3 py-2 bg-gray-600 text-white rounded-r-md focus:outline-none"
              >
                +
              </button>
            </div>
          </div>
          <div>
            <label className="block text-white font-medium mb-1">
              Number of Bedrooms
            </label>
            <div className="flex">
              <button
                type="button"
                onClick={() => decrement(bedrooms, setBedrooms)}
                className="px-3 py-2 bg-gray-600 text-white rounded-l-md focus:outline-none"
              >
                -
              </button>
              <input
                type="number"
                value={bedrooms}
                onChange={(e) => setBedrooms(Number(e.target.value))}
                className="w-full px-4 py-2 text-center bg-gray-700 text-white focus:outline-none"
              />
              <button
                type="button"
                onClick={() => increment(bedrooms, setBedrooms)}
                className="px-3 py-2 bg-gray-600 text-white rounded-r-md focus:outline-none"
              >
                +
              </button>
            </div>
          </div>
          <div>
            <label className="block text-white font-medium mb-1">
              Number of Bathrooms
            </label>
            <div className="flex">
              <button
                type="button"
                onClick={() => decrement(bathrooms, setBathrooms)}
                className="px-3 py-2 bg-gray-600 text-white rounded-l-md focus:outline-none"
              >
                -
              </button>
              <input
                type="number"
                value={bathrooms}
                onChange={(e) => setBathrooms(Number(e.target.value))}
                className="w-full px-4 py-2 text-center bg-gray-700 text-white focus:outline-none"
              />
              <button
                type="button"
                onClick={() => increment(bathrooms, setBathrooms)}
                className="px-3 py-2 bg-gray-600 text-white rounded-r-md focus:outline-none"
              >
                +
              </button>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-white mb-1">Unit Type</label>
            <select className="w-full p-2 rounded">
              <option value="Apartment">Apartment</option>
              <option value="Villa">Villa</option>
              <option value="Townhouse">Townhouse</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-white mb-1">Location</label>
            <select value={location} className="w-full p-2 rounded">
              <option value="Palm Jumeirah">Palm Jumeirah</option>
              <option value="Downtown">Downtown</option>
              <option value="Dubai Marina">Dubai Marina</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-300"
          >
            Predict Price
          </button>
        </form>
      </div>

      {/* Predicted Price Section */}
      {predictedPrice && (
        <div className="bg-gradient-to-r from-orange-600 to-yellow-500 text-white text-center text-4xl py-5 px-8 rounded-lg mb-8 shadow-lg">
          <span role="img" aria-label="price">
            💰
          </span>{" "}
          Predicted Price: {predictedPrice}
        </div>
      )}

      {/* Map Section */}
      <div className=" bg-opacity-80 p-4 rounded-xl w-full max-w-3xl shadow-lg">
        <h2 className="text-2xl text-white text-center mb-4">
          Property Location on Map
        </h2>
        <MapContainer 
            center={[22.71792, 75.8333]} 
            zoom={10} 
            scrollWheelZoom={false} 
            className="h-96 w-full mt-4 rounded-md"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker 
              position={[25.276987, 55.296249]} 
              icon={L.icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })}
            >
              <Popup>Estimated Property Location</Popup>
            </Marker>
          </MapContainer>
      </div>
    </div>
  );
};

export default PropertyPricePrediction;
