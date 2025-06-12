import { useState } from 'react'

const Form = () => {
  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Wysłano: ${name} — ${desc}`)
    setName('')
    setDesc('')
  }

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Dodaj nowe zgłoszenie</h2>
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
          Wyślij
        </button>
      </form>
    </div>
  )
}

export default Form
