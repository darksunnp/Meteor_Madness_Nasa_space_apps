import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Globe from './Components/globe.jsx'
import SimpleToggleSidebar from './Components/Sidebar'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className="absolute top-4 left-0 bg-white bg-opacity-75 p-2 rounded shadow z-10">
    <SimpleToggleSidebar />
    </div>
    <Globe />
    
    
  </StrictMode>,
)
