import React from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { useNavigate } from 'react-router-dom'

function BathroomList() {
  const navigate = useNavigate()

  const handleClick = (id) => {
    navigate(`/bathrooms/${id}`)// navigate to /bathrooms/:id
  }

  const bathrooms = useSelector(state => state.bathrooms.bathrooms)

  return (
    <div>
    {bathrooms.map((bathroom) => (
      <div key={bathroom.id} className="bathroom-card" onClick={() => {handleClick(bathroom.id)}}>
        <h2>{bathroom.bathroom_name} </h2> 
        <p>Address: {bathroom.street_num} {bathroom.street_name}</p>
        <p>City: {bathroom.city}</p>
        <p>Zip code: {bathroom.zip_code}</p>
      </div>
    ))}</div>
  )
}

export default BathroomList