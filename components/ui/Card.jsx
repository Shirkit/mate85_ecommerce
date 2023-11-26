import React from 'react'
import RenderStars, { renderStars } from './stars'

export default async function Card(props) {

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 m-4 flex flex-col items-center">
      <h1 className="text-xl font-semibold mb-2">{props.name}</h1>
      <img
        src={props.image}
        alt="Product Photo"
        className="w-full h-40 object-cover mb-2"
      />
      {(
        <div className="flex items-center mt-2">
          <RenderStars rating={props.rating}></RenderStars>
        </div>
      )}
      {
        props.price && (
          <p className="text-gray-700 text-sm">{typeof props.price.toFixed !== 'undefined' ? "R$" + props.price.toFixed(2) : props.price }</p>
        )
      }
    </div>
  )
}
