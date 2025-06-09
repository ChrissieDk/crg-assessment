import type { TimelineItem as TimelineItemType } from '../types/Timeline';
import React, { useEffect, useRef } from 'react';
import TimelineItem from './TimelineItem';

interface TimelineProps {
  displayedItems: TimelineItemType[];
  loadMore: () => void;
  loadingMore: boolean;
  filteredItemsCount: number;
  onAudioSelect: (audioUrl: string) => void;
  sidebarOpen: boolean; 
}

const Timeline: React.FC<TimelineProps> = ({
  displayedItems,
  loadMore,
  loadingMore,
  filteredItemsCount,
  onAudioSelect,
  sidebarOpen,
}) => {
  const baseUrl = 'https://arthurfrost.qflo.co.za/';
  const observerTarget = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Cleanup observer on unmount
  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Set up Intersection Observer
  useEffect(() => {
    const currentTarget = observerTarget.current;
    if (!currentTarget) return;

    // Disconnect previous observer if it exists
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Create new observer
    observerRef.current = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !loadingMore && displayedItems.length < filteredItemsCount) {
          loadMore();
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '100px'
      }
    );

    observerRef.current.observe(currentTarget);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [loadMore, filteredItemsCount, displayedItems.length, loadingMore]);

  // Dynamic grid classes based on available space
  const getGridClasses = () => {
    const baseGrid = "grid gap-6";
    // Adjust grid columns based on sidebar state and screen size
    if (sidebarOpen) {
      return `${baseGrid} grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3`;
    } else {
      return `${baseGrid} grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {displayedItems.length === 0 && !loadingMore && filteredItemsCount === 0 ? (
        <p className="text-center text-gray-600">No timeline items available.</p>
      ) : (
        <div className={getGridClasses()}>
          {displayedItems.map((item) => (
            <TimelineItem
              key={item.Id}
              item={item}
              baseUrl={baseUrl}
              onAudioSelect={onAudioSelect}
            />
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