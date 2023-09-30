"use client"
import React, { useState } from "react";


export default function Sidebar() {
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [selectedSize, setSelectedSize] = useState("");

  const handlePriceChange = (e) => {
    const value = parseInt(e.target.value, 10);
    const minPrice = value > priceRange[1] ? priceRange[1] : value;
    const maxPrice = value < priceRange[0] ? priceRange[0] : value;

    setPriceRange([minPrice, maxPrice]);
  };

  const handleSizeChange = (e) => {
    setSelectedSize(e.target.value);
  };

  return (
    <div className="text-gray h-full w-1/5 p-4 rounded-lg border-solid border">
      <h2 className="text-xl font-bold mb-4">Filtros</h2>

      <div className="mb-4">
        <label className="block mb-1">Price Range</label>
        <input
          type="range"
          min="0"
          max="100"
          step="10"
          onChange={handlePriceChange}
          className="w-full h-3 rounded-md bg-gray-300 appearance-none accent-black"
          style={{
            background: `linear-gradient(to right, black 0%, black ${(priceRange[0] / 100) * 100}%, #ccc ${(priceRange[1] / 100) * 100}%, #ccc 100%)`,
          }}
        />
        <div className="flex justify-between">
          <span>0</span>
          <span>{priceRange[1]}</span> {/* Display the maximum value */}
        </div>
      </div>

      <div className="mb-4">
        <label className="block mb-1">Shirt Size</label>
        <select
          value={selectedSize}
          onChange={handleSizeChange}
          className="w-full border p-2 rounded"
        >
          <option value="">All</option>
          <option value="P">P</option>
          <option value="M">M</option>
          <option value="G">G</option>
          <option value="GG">GG</option>
        </select>
      </div>

      <div className="flex justify-center">
        <button className="bg-black text-white px-8 py-2 mx-auto  rounded">Aplicar Filtro</button>
      </div>
    </div>
  );
}
