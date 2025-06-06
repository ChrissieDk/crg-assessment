import { useEffect, useState, useCallback } from 'react';
import api from '../utils/axios';
import type { TimelineItem, TimelineResponse } from '../types/Timeline';

const ITEMS_PER_LOAD = 20;

export function useTimeline(searchQuery: string) {
  const [fullItems, setFullItems] = useState<TimelineItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<TimelineItem[]>([]);
  const [displayedItems, setDisplayedItems] = useState<TimelineItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    api.get<TimelineResponse>('getTimeline.php')
      .then(response => {
        if (response.data && Array.isArray(response.data.Timeline)) {
          setFullItems(response.data.Timeline);
          // Filtering and setting initial displayed items will now happen in the filter effect
        } else {
          setError('Invalid data structure received from API');
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('API Error:', err);
        setError('Failed to fetch timeline data');
        setLoading(false);
      });
  }, []);

  // Effect to filter items whenever fullItems or searchQuery changes
  useEffect(() => {
    let itemsToFilter = fullItems;

    if (searchQuery) {
      itemsToFilter = fullItems.filter(item =>
        // Perform case-insensitive search on the start of the CreateDate string
        item.CreateDate.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    }

    setFilteredItems(itemsToFilter);
    // Reset displayed items to the first chunk of the filtered list
    setDisplayedItems(itemsToFilter.slice(0, ITEMS_PER_LOAD));

  }, [fullItems, searchQuery]); // Re-run when fullItems or searchQuery changes

  // Function to load the next chunk of items from the *filtered* list
  const loadMore = useCallback(() => {
    // Use filteredItems for loading more logic
    if (loadingMore || displayedItems.length === filteredItems.length) return;

    setLoadingMore(true);

    const nextItems = filteredItems.slice(
      displayedItems.length,
      displayedItems.length + ITEMS_PER_LOAD
    );

    setTimeout(() => {
      setDisplayedItems(prevItems => [...prevItems, ...nextItems]);
      setLoadingMore(false);
    }, 300);

  }, [loadingMore, displayedItems, filteredItems]); // Dependencies for useCallback

  // Return filteredItems count for rendering end message
  return { displayedItems, loading, error, loadMore, loadingMore, filteredItemsCount: filteredItems.length };
} 