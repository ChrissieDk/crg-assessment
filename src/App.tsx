import Timeline from './components/Timeline';
import { useTimeline } from './hooks/useTimeline';
import { useState } from 'react';

function App() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedAudioUrl, setSelectedAudioUrl] = useState<string | null>(null);

  const { displayedItems, loading, error, loadMore, loadingMore, filteredItemsCount } = useTimeline(searchQuery);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleAudioSelect = (audioUrl: string) => {
    setSelectedAudioUrl(audioUrl);
  };

  const handleCloseAudioPlayer = () => {
    setSelectedAudioUrl(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">

        <div className="mb-8 flex justify-center">
          <div className="relative w-full max-w-md flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search by date (e.g., 07 Jul 2020)"
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {searchQuery && (
              <button
                onClick={handleClearSearch}
                className="absolute right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                aria-label="Clear search"
              >
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                 </svg>
              </button>
            )}
          </div>
        </div>

        {loading && <span className="text-blue-500">Loading initial data...</span>}
        {error && <span className="text-red-500">{error}</span>}

        {!loading && !error && (
          filteredItemsCount > 0 ? (
            <Timeline
              displayedItems={displayedItems}
              loadMore={loadMore}
              loadingMore={loadingMore}
              filteredItemsCount={filteredItemsCount}
              onAudioSelect={handleAudioSelect}
            />
          ) : (
            searchQuery ? (
              <p className="text-center text-gray-600 text-lg">No items found matching your search criteria.</p>
            ) : (
              <p className="text-center text-gray-600 text-lg">No timeline items available.</p>
            )
          )
        )}
      </div>

      {selectedAudioUrl && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl relative max-w-md w-full">
               <audio key={selectedAudioUrl} src={selectedAudioUrl} controls autoPlay className="w-full" />
               <button
                onClick={handleCloseAudioPlayer}
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 focus:outline-none"
                aria-label="Close audio player"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}

    </div>
  );
}

export default App;
