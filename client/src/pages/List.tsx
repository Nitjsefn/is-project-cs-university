const mockData = [
  { id: 1, name: 'Zgłoszenie A', status: 'Nowe' },
  { id: 2, name: 'Zgłoszenie B', status: 'W trakcie' },
  { id: 3, name: 'Zgłoszenie C', status: 'Zakończone' },
]

const List = () => (
  <div>
    <h2 className="text-2xl font-semibold mb-4">Lista zgłoszeń</h2>
    <table className="w-full border border-gray-300">
      <thead className="bg-gray-200">
        <tr>
          <th className="p-2 border">ID</th>
          <th className="p-2 border">Nazwa</th>
          <th className="p-2 border">Status</th>
        </tr>
      </thead>
      <tbody>
        {mockData.map(item => (
          <tr key={item.id} className="text-center">
            <td className="p-2 border">{item.id}</td>
            <td className="p-2 border">{item.name}</td>
            <td className="p-2 border">{item.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

export default List
