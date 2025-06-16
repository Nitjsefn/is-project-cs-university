import { useEffect, useState } from 'react';
import { getZgloszenia, deleteZgloszenie } from '../api/api';

const List = () => {
  const [data, setData] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');

  const fetchData = async () => {
    try {
      const res = await getZgloszenia();
      setData(res.data);
      setFiltered(res.data);
    } catch {
      setError('Nie udało się załadować dane');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setFiltered(data.filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase())
    ));
  }, [query, data]);

  const handleDelete = async (id: number) => {
    if (!confirm('Usunąć zgłoszenie?')) return;
    try {
      await deleteZgloszenie(id);
      fetchData();
    } catch {
      alert('Błąd usunięcia.');
    }
  };

  if (loading) return <p>Ładowanie...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Lista zgłoszeń</h2>
      <input
        className="mb-4 p-2 border rounded"
        placeholder="Wyszukiwanie p nazwie..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <table className="w-full border border-gray-300">
        <thead className="bg-gray-200">
          <tr className="text-center">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Nazwa</th>
            <th className="p-2 border">Opis</th>
            <th className="p-2 border">Opcje</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(item => (
            <tr key={item.id} className="text-center">
              <td className="p-2 border">{item.id}</td>
              <td className="p-2 border">{item.name}</td>
              <td className="p-2 border">{item.description}</td>
              <td className="p-2 border">
                <button
                  className="text-red-600 hover:underline"
                  onClick={() => handleDelete(item.id)}
                >
                Usunąć
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default List;
