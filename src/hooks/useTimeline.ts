import { useEffect, useState, useCallback, useMemo } from 'react';
import api from '../utils/axios';
import type { TimelineItem, TimelineResponse } from '../types/Timeline';

const ITEMS_PER_LOAD = 20;

export function useTimeline(searchQuery: string, selectedCategory: string | null) {
  const [fullItems, setFullItems] = useState<TimelineItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [displayedItems, setDisplayedItems] = useState<TimelineItem[]>([]);

  useEffect(() => {
    setLoading(true);
    api.get<TimelineResponse>('getTimeline.php')
      .then(response => {
        if (response.data && Array.isArray(response.data.Timeline)) {
          setFullItems(response.data.Timeline);
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

  const filteredItems = useMemo(() => {
    let items = fullItems;
    if (searchQuery) {
      items = items.filter(item =>
        item.CreateDate.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    }
    if (selectedCategory) {
      items = items.filter(item => item.Category === selectedCategory);
    }
    return items;
  }, [fullItems, searchQuery, selectedCategory]);

  const categories = useMemo(() => 
    Array.from(new Set(fullItems.map(item => item.Category))),
    [fullItems]
  );

  // Reset displayed items when filters change
  useEffect(() => {
    setDisplayedItems(filteredItems.slice(0, ITEMS_PER_LOAD));
    setLoadingMore(false);
  }, [filteredItems]);

  const loadMore = useCallback(() => {
    setLoadingMore(true);
    
    requestAnimationFrame(() => {
      setDisplayedItems(prevItems => {
        // Calculate how many more items to load
        const currentLength = prevItems.length;
        const nextBatch = filteredItems.slice(currentLength, currentLength + ITEMS_PER_LOAD);
        
        // Only append if we have more items and we're not exceeding the filtered items
        if (nextBatch.length > 0 && currentLength < filteredItems.length) {
          return [...prevItems, ...nextBatch];
        }
        
        return prevItems;
      });
      setLoadingMore(false);
    });
  }, [filteredItems]);

  return { 
    displayedItems, 
    loading, 
    error, 
    loadMore, 
    loadingMore, 
    filteredItemsCount: filteredItems.length,
    categories 
  };
}