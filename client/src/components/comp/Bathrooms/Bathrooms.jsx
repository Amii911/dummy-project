import React from 'react'
import BathroomList from './BathroomList'
// import Search from './Search';

function Bathrooms() {
  
  return (
    <div className="container">
      {/* <Search/> */}
      <h2 className="home-header">NYC Bathrooms</h2>
      <div className="bathrooms-container">
        <BathroomList/>
      </div>
    </div>
  );
}

export default Bathrooms