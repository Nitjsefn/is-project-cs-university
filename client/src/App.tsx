import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Login from './pages/Login'
import { useEffect, useState } from 'react'
//import Context from './support/Context';
import Register from './pages/Register';
import Home from './pages/Home';
import Overview from './pages/Overview';
import Chart from './pages/Chart';

function App() {
    //const ctx = useState(new Context)[0];

    const [token, setToken] = useState("");

<<<<<<< master
  const [language, setLanguage]   = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate,   setEndDate]  = useState("");

    return (
        <div className="min-h-screen bg-gray-100">
=======
    useEffect(() => {
        const t = localStorage.getItem("jwt");
        if(t != null)
            setToken(t);
    }, [token]);

    const changeToken = (token: string) => {
        setToken(token);
        localStorage.setItem("jwt", token);
    }
>>>>>>> master

    return (
        <div className="min-h-screen bg-gray-100 w-full m-auto">
            <Header setToken={changeToken}/>
            <div className="p-6">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login setToken={changeToken} />} />
                    <Route path="/register" element={<Register setToken={changeToken} />} />
                    <Route path="/overview" element={<Overview token={token} />} />
<<<<<<< master
		    <Route path="/chart" element={<Chart token={token} language={language} startDate={startDate} endDate={endDate} />}/>

=======
>>>>>>> master
                </Routes>
            </div>
        </div>
    );
}

export default App;
