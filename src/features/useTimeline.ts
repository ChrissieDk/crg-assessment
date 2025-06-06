import { useEffect, useState } from 'react';
import api from '../utils/axios';
import type { TimelineItem } from '../types/Timeline';

export function useTimeline() {
  const [items, setItems] = useState<TimelineItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.get<TimelineItem[]>('getTimeline.php')
      .then(response => {
        setItems(response.data);
        console.log(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to fetch timeline data');
        setLoading(false);
      });
  }, []);

  return { items, loading, error };
} 