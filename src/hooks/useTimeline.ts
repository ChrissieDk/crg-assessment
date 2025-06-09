import { useEffect, useState, useCallback, useMemo } from "react";
import api from "../utils/axios";
import type { TimelineItem, TimelineResponse } from "../types/Timeline";

const ITEMS_PER_LOAD = 20;

export function useTimeline(
  searchQuery: string,
  selectedCategory: string | null
) {
  const [fullItems, setFullItems] = useState<TimelineItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [displayedItems, setDisplayedItems] = useState<TimelineItem[]>([]);

  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get<TimelineResponse>("getTimeline.php");

        if (response.data?.Timeline && Array.isArray(response.data.Timeline)) {
          setFullItems(response.data.Timeline);
        } else {
          setError("Invalid data received from server");
        }
      } catch (err) {
        console.error("API Error:", err);
        setError("Failed to fetch timeline data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter items based on search and category
  const filteredItems = useMemo(() => {
    let items = fullItems;

    if (searchQuery) {
      const query = searchQuery.toLowerCase().trim();
      items = items.filter(
        (item) =>
          item.CreateDate.toLowerCase().startsWith(query) ||
          item.Category.toLowerCase().includes(query)
      );
    }

    if (selectedCategory) {
      items = items.filter((item) => item.Category === selectedCategory);
    }

    return items;
  }, [fullItems, searchQuery, selectedCategory]);

  // Extract unique categories
  const categories = useMemo(
    () => [...new Set(fullItems.map((item) => item.Category))].sort(),
    [fullItems]
  );

  // Reset displayed items when filters change
  useEffect(() => {
    setDisplayedItems(filteredItems.slice(0, ITEMS_PER_LOAD));
    setLoadingMore(false);
  }, [filteredItems]);

  // Load more items
  const loadMore = useCallback(() => {
    if (loadingMore) return;

    setLoadingMore(true);

    setTimeout(() => {
      setDisplayedItems((prev) => {
        const currentLength = prev.length;
        const hasMore = currentLength < filteredItems.length;

        if (!hasMore) {
          setLoadingMore(false);
          return prev;
        }

        const nextItems = filteredItems.slice(
          currentLength,
          currentLength + ITEMS_PER_LOAD
        );
        setLoadingMore(false);
        return [...prev, ...nextItems];
      });
    }, 0);
  }, [filteredItems, loadingMore]);

  return {
    displayedItems,
    loading,
    error,
    loadMore,
    loadingMore,
    filteredItemsCount: filteredItems.length,
    categories,
    hasMoreItems: displayedItems.length < filteredItems.length,
  };
}
