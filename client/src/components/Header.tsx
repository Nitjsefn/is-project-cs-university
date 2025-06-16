import { Link } from 'react-router-dom'

const Header = () => (
  <header className="bg-blue-700 text-white px-6 py-4 flex gap-6 text-lg font-medium">
    <Link to="/" className="hover:underline">🏠 Home</Link>
    <Link to="/list" className="hover:underline">📄 Lista</Link>
    <Link to="/form" className="hover:underline">➕ Formularz</Link>
    <Link to="/chart">📈 Wykres</Link>
    <Link to="/admin" className="hover:underline">🛠 Panel admina</Link>
  </header>
)

export default Header
