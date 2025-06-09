import type { TimelineItem as TimelineItemType } from '../types/Timeline';
import React, { useEffect, useRef } from 'react';
import TimelineItem from './TimelineItem';

interface TimelineProps {
  displayedItems: TimelineItemType[];
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
  }, [loadMore, filteredItemsCount, displayedItems]);

  return (
    <div className="container mx-auto px-4 py-8">
      {displayedItems.length === 0 && !loadingMore && filteredItemsCount === 0 ? (
        <p className="text-center text-gray-600">No timeline items available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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