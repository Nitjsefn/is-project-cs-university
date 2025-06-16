import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Login from './pages/Login'
import { useState } from 'react'
//import Context from './support/Context';
import Register from './pages/Register';
import Home from './pages/Home';
import Overview from './pages/Overview';

function App() {
    //const ctx = useState(new Context)[0];
    const [token, setToken] = useState("");

    return (
        <div className="min-h-screen bg-gray-100 w-full m-auto">
            <Header setToken={setToken}/>
            <div className="p-6">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login setToken={setToken}/>} />
                    <Route path="/register" element={<Register setToken={setToken}/>} />
                    <Route path="/overview" element={<Overview token={token}/>} />
                </Routes>
            </div>
        </div>
    )
}

export default App
