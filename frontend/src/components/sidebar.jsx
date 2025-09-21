import React from 'react';

export default function Sidebar({ onAsteroidSelect }) {
  return (
    <div className="sidebar" style={{ width: "250px", padding: "20px", background: "#f0f0f0" }}>
      <h2>Select Asteroid</h2>
      <button onClick={() => onAsteroidSelect([20, 78])}>Asteroid 1 (India)</button>
      <button onClick={() => onAsteroidSelect([-33, 151])}>Asteroid 2 (Australia)</button>
      <button onClick={() => onAsteroidSelect([40, -74])}>Asteroid 3 (USA)</button>
    </div>
  );
}
