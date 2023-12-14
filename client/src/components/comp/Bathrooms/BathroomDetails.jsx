import React, { useEffect, useState } from "react";
import { useParams, Link } from 'react-router-dom';
import Reviews from "../Reviews/Reviews";

function BathroomDetails() {
  const { id } = useParams();
  const [bathroom, setBathroom] = useState({});
  
  useEffect(() => {
    fetch(`/api/bathrooms/${id}`)
      .then(res => res.json())
      .then(data => {
        setBathroom(data); 
      });
  }, [id]);

  return (
    <div className="container">
        <div>
          <h2>{bathroom.bathroom_name}</h2>
          <div>
            <p>Address: {bathroom.street_num} {bathroom.street_name}</p>
            <p>City: {bathroom.city}</p>
            <p>Zip Code: {bathroom.zip_code}</p>
            <hr />
            <Reviews bathroomId={id}/>
            <Link to="/bathrooms">Back to List</Link>
          </div>
        </div>
    </div>
  );
}

export default BathroomDetails;
