import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Landing from './pages/Landing'
import AccentureRoadmap from './pages/AccentureRoadmap'
import Unlock from './pages/Unlock'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/accenture-roadmap" element={<AccentureRoadmap />} />
        <Route path="/unlock" element={<Unlock />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
