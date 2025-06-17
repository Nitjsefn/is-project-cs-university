import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Login from './pages/Login';
import { useEffect, useState } from 'react';
import Register from './pages/Register';
import Home from './pages/Home';
import Overview from './pages/Overview';
import Chart from './pages/Chart';

function App() {
  const [token, setToken] = useState("");
  const [language, setLanguage] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const t = localStorage.getItem("jwt");
    if (t != null) {
      setToken(t);
    }
  }, []);

  const changeToken = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem("jwt", newToken);
  };

  return (
    <div className="min-h-screen bg-gray-100 w-full m-auto">
      <Header setToken={changeToken} />
      <div className="p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setToken={changeToken} />} />
          <Route path="/register" element={<Register setToken={changeToken} />} />
          <Route path="/overview" element={<Overview token={token} />} />
             


		


	  </Routes>
      </div>
    </div>
  );
}

export default App;

