import Timeline from './components/Timeline';
import Sidebar from './components/Sidebar';
import { useTimeline } from './hooks/useTimeline';
import { useState } from 'react';

function App() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedAudioUrl, setSelectedAudioUrl] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const { 
    displayedItems, 
    loading, 
    error, 
    loadMore, 
    loadingMore, 
    filteredItemsCount,
    categories 
  } = useTimeline(searchQuery, selectedCategory);

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

  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar
        categories={categories}
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategorySelect}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onClearSearch={handleClearSearch}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      <div className={`flex-1 transition-all duration-300 ease-in-out ${sidebarOpen ? 'md:ml-64 ml-16' : 'md:ml-16 ml-16'}`}>
        <div className="container mx-auto px-4 py-8">
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
                sidebarOpen={sidebarOpen}
              />
            ) : (
              searchQuery || selectedCategory ? (
                <p className="text-center text-gray-600 text-lg">No items found matching your criteria.</p>
              ) : (
                <p className="text-center text-gray-600 text-lg">No timeline items available.</p>
              )
            )
          )}
        </div>
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
