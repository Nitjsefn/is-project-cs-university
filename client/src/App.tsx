import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Login from './pages/Login';
import { useState } from 'react';
import Register from './pages/Register';
import Home from './pages/Home';
import Overview from './pages/Overview';
import Chart from './pages/Chart';
function App() {
    const [token, setToken] = useState("");

    return (
        <div className="min-h-screen bg-gray-100">
            <Header setToken={setToken} />
            <div className="p-6">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login setToken={setToken} />} />
                    <Route path="/register" element={<Register setToken={setToken} />} />
                    <Route path="/overview" element={<Overview token={token} />} />
                    <Route path="/chart" element={<Chart />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
