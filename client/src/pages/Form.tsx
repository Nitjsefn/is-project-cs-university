import { useState } from 'react';
import { addZgloszenie } from '../api/api';
import { useNavigate } from 'react-router-dom';

const Form = () => {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addZgloszenie({ name, description: desc });
      setStatus('Zgłoszenie pomyślnie dodano!');
      setName('');
      setDesc('');
      setTimeout(() => navigate('/list'), 1000);
    } catch {
      setStatus('Bład przy dodaniu.');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Dodać zgłoszenie</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Nazwa"
          className="w-full border p-2 rounded"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <textarea
          placeholder="Opis"
          className="w-full border p-2 rounded"
          value={desc}
          onChange={e => setDesc(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Wysłać
        </button>
        {status && <p className="mt-2 text-sm">{status}</p>}
      </form>
    </div>
  );
};

export default Form;
