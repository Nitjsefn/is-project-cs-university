import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Login from './pages/Login'
import { useState } from 'react'
import Context from './support/Context';
import Register from './pages/Register';
import Home from './pages/Home';

function App() {
    const ctx = useState(new Context)[0];

    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <div className="p-6">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login ctx={ctx}/>} />
                    <Route path="/register" element={<Register ctx={ctx}/>} />
                    <Route path="/overview" element={null} />
                </Routes>
            </div>
            {ctx.tokenExists().toString()}
        </div>
    )
}

export default App
