import { Link } from 'react-router-dom'

//const Header = () => (
  //<header className="bg-blue-700 text-white px-6 py-4 flex gap-6 text-lg font-medium">
    //<Link to="/" className="hover:underline">🏠 Home</Link>
    //<Link to="/list" className="hover:underline">📄 Lista</Link>
    //<Link to="/form" className="hover:underline">➕ Formularz</Link>
    //<Link to="/admin" className="hover:underline">🛠 Panel admina</Link>
  //</header>
//)

const Header = (props: {setToken: (t: string)=>void}) => (
  <header className="bg-blue-700 text-white px-6 py-4 flex gap-6 text-lg font-medium">
    <Link to="/" className="hover:underline">🏠 Home</Link>
    <Link to="/Overview" className="hover:underline">📄 Overview</Link>
    <Link to="/login" className="hover:underline">➕ Login</Link>
    <Link to="/register" className="hover:underline">➕ Register</Link>
    <span onClick={() => props.setToken("")}>Log Out</span>
  </header>
)

export default Header
