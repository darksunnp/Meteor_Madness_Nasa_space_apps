import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Globe from './Components/globe.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div style={{ position: 'absolute', top: 0, left: 0, zIndex: 1, padding: '10px', backgroundColor: 'rgba(0, 0, 0)' }}>
    <Globe />
    </div>
  </StrictMode>,
)
