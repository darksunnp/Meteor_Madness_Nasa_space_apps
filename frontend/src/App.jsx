import React from 'react';
import Map from './components/map.jsx';
import Sidebar from './components/sidebar.jsx';
import Earth from "./components/Earth";

export default function App() {
  
  return (
    <div style={{ display: "flex" }}>
      <Sidebar  />
      <Earth />
    </div>
  );
}
