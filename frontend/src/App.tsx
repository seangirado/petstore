import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PetGallery from './pages/PetGallery'
import PetDetail from './pages/PetDetail'
import PetFormPage from './pages/PetFormPage'

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<PetGallery />} />
          <Route path="/pets/new" element={<PetFormPage />} />
          <Route path="/pets/:petId/edit" element={<PetFormPage />} />
          <Route path="/pets/:petId" element={<PetDetail />} />
        </Routes>
      </div>
    </Router>
  )
}
