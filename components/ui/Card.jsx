import React from 'react';

export default async function Card(props) {

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(
        <span key={i} className="text-yellow-500">&#9733;</span> // Star symbol
      );
    }
    return stars;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 m-4 flex flex-col items-center">
      <h1 className="text-xl font-semibold mb-2">{props.name}</h1>
      <img
        src={props.image}
        alt="Product Photo"
        className="w-full h-40 object-cover mb-2"
      />
      {props.rating && (
        <div className="flex items-center mt-2">
        {renderStars(props.rating)}
        <span className="ml-1">{props.rating}</span>
        </div>
      )}
      <p className="text-gray-700 text-lg">${props.price.toFixed(2)}</p>

    </div>
  );
}
