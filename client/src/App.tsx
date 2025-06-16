import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import List from './pages/List'
import Form from './pages/Form'
import Admin from './pages/Admin'
import Header from './components/Header'
import Chart from './pages/Chart'; 

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="p-6">
        <Routes>
          <Route path="/chart" element={<Chart />} />
          <Route path="/" element={<Home />} />
          <Route path="/list" element={<List />} />
          <Route path="/form" element={<Form />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
