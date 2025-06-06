import Timeline from './components/Timeline';
import { useTimeline } from './features/useTimeline';

function App() {
  const { items, loading, error } = useTimeline();

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {loading && <span className="text-blue-500">Loading...</span>}
      {error && <span className="text-red-500">{error}</span>}
      {!loading && !error && <Timeline items={items} />}
    </div>
  );
}

export default App;
