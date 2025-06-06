import type { TimelineItem } from '../types/Timeline';
import React, { useEffect, useRef } from 'react';

interface TimelineProps {
  displayedItems: TimelineItem[];
  loadMore: () => void;
  loadingMore: boolean;
  filteredItemsCount: number;
  onAudioSelect: (audioUrl: string) => void;
}

const Timeline: React.FC<TimelineProps> = ({
  displayedItems,
  loadMore,
  loadingMore,
  filteredItemsCount,
  onAudioSelect,
}) => {
  const baseUrl = 'https://arthurfrost.qflo.co.za/';
  const observerTarget = useRef<HTMLDivElement | null>(null);

  // Set up Intersection Observer
  useEffect(() => {
    const currentTarget = observerTarget.current;
    if (!currentTarget) return;

    const observer = new IntersectionObserver(
      entries => {
        // Only load more if the target is visible AND there are more items to load
        if (entries[0].isIntersecting && displayedItems.length < filteredItemsCount) {
          loadMore();
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the target is visible
    );

    observer.observe(currentTarget);

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [loadMore, filteredItemsCount, displayedItems]); // Dependencies for useCallback

  return (
    <div className="container mx-auto px-4 py-8">
      {displayedItems.length === 0 && !loadingMore && filteredItemsCount === 0 ? (
        <p className="text-center text-gray-600">No timeline items available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedItems.map((item) => (
            <div
              key={item.Id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col border border-gray-200"
            >
              {item.Image && (
                <img
                  src={`${baseUrl}${item.Image.replace('\\', '/')}`}
                  alt={item.Title || 'Timeline Image'}
                  className="w-full h-48 object-cover aspect-video"
                />
              )}
              <div className="p-5 flex-grow flex flex-col">
                <h3 className="text-2xl font-bold text-gray-900 mb-3 leading-tight">
                  {item.Title}
                </h3>
                {item.Description && (
                  <p className="text-gray-700 text-base mb-4 flex-grow leading-relaxed">
                    {item.Description}
                  </p>
                )}
                <div className="mt-auto flex items-center justify-between text-sm text-gray-500 border-t pt-4 border-gray-100">
                   <div className="flex items-center">
                     {item.Icon && (
                      <img
                        src={`${baseUrl}${item.Icon.replace('\\', '/')}`}
                        alt="Icon"
                        className="w-5 h-5 mr-2 rounded-full"
                      />
                    )}
                    <span>{item.CreateDate}</span>
                   </div>
                  {item.Audio && (
                    <button
                      onClick={() => onAudioSelect(`${baseUrl}${item.Audio.replace('\\', '/')}`)}
                      className="text-blue-600 hover:underline text-sm flex items-center focus:outline-none"
                    >
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 6.343a1 1 0 010 1.414L15.99 9.172a3 3 0 010 4.243l-1.333 1.333a1 1 0 001.414 1.414l1.333-1.333a5 5 0 000-7.07l-1.414-1.414a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      Listen
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Loading more indicator */}
      {loadingMore && (
        <div className="flex justify-center mt-8">
          <span className="text-blue-500 text-lg font-semibold">Loading more items...</span>
        </div>
      )}

      {/* Intersection Observer target */}
      {!loadingMore && displayedItems.length > 0 && displayedItems.length < filteredItemsCount && (
         <div ref={observerTarget} style={{ height: '30px' }} className="w-full"></div>
      )}
       {/* End of list indicator */}
       {!loadingMore && displayedItems.length > 0 && displayedItems.length === filteredItemsCount && (
         <div className="flex justify-center mt-8">
           <span className="text-gray-600 text-lg">You've reached the end of the timeline.</span>
         </div>
       )}
    </div>
  );
};

export default Timeline; 