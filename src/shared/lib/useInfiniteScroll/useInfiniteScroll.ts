import { useCallback, useEffect, useRef } from 'react';

interface UseInfiniteScrollOptions {
  hasMore: boolean;
  isLoading: boolean;
  onLoadMore: () => void;
  rootMargin?: string;
  disabled?: boolean;
}

export const useInfiniteScroll = ({
  hasMore,
  isLoading,
  onLoadMore,
  rootMargin = '300px 0px',
  disabled = false,
}: UseInfiniteScrollOptions): ((node: HTMLElement | null) => void) => {
  const onLoadMoreRef = useRef(onLoadMore);
  const lockRef = useRef(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    onLoadMoreRef.current = onLoadMore;
  }, [onLoadMore]);

  useEffect(() => {
    if (!isLoading) {
      lockRef.current = false;
    }
  }, [isLoading]);

  useEffect(() => {
    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const sentinelRef = useCallback(
    (node: HTMLElement | null) => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }

      if (!node || !hasMore || disabled) return;

      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !lockRef.current) {
            lockRef.current = true;
            onLoadMoreRef.current();
          }
        },
        { rootMargin }
      );

      observerRef.current.observe(node);
    },
    [hasMore, disabled, rootMargin]
  );

  return sentinelRef;
};
