import './App.css'
import Header from './components/Header'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import AddNew from './pages/AddNew'
import Edit from './pages/Edit'
import Remove from './pages/Remove'

function App() {
  return (
    <div className="app">
      <Header />
      <section className="section">
        <Routes>
          <Route path="/" element={<Navigate to="/employees" replace />} />
          <Route path="/employees" element={<Home />} />
          <Route path="/employees/add-new" element={<AddNew />} />
          <Route path="/employees/edit/:id" element={<Edit />} />
          <Route path="/employees/remove/:id" element={<Remove />} />
        </Routes>
      </section>
    </div>
  )
}

export default App
