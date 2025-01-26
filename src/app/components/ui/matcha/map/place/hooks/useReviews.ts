import useSWR from 'swr';
import { Review } from '@/types/Review';

export function useReviews({ id }: { id: string }) {
    const { data, error } = useSWR<Review[]>(`/api/review?id=${id}`, async (url: string) => {
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch reviews');
      return res.json();
    });
  
    return {
      reviews: data,
      isLoading: !error && !data,
      isError: error
    };
  }