import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import toast from 'react-hot-toast';

import type { ApiCharacter } from '@/entities/character';
import { getCharacters } from '@/entities/character';
import { useDebounce } from '@/shared/lib';
import type { FilterPanelValues } from '@/widgets';

export const useCharacters = (filters: FilterPanelValues) => {
  const [characters, setCharacters] = useState<ApiCharacter[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [isLoadingInitial, setIsLoadingInitial] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const debouncedName = useDebounce(filters.name);
  const { status, species, gender } = filters;

  const filterVersionRef = useRef(0);

  const filterParams = useMemo(
    () =>
      Object.fromEntries(
        Object.entries({ name: debouncedName, status, species, gender }).filter(
          ([, value]) => Boolean(value)
        )
      ),
    [debouncedName, status, species, gender]
  );

  useEffect(() => {
    const filterVersion = ++filterVersionRef.current;
    const controller = new AbortController();

    const fetchInitial = async () => {
      setIsLoadingInitial(true);
      setPage(1);

      try {
        const data = await getCharacters({ ...filterParams, page: 0 }, controller.signal);

        if (filterVersion !== filterVersionRef.current) return;

        setCharacters(data.results);
        setHasMore(data.info.next !== null);
        setIsLoadingInitial(false);
      } catch (error: unknown) {
        if (error instanceof Error && error.name === 'AbortError') return;
        if (filterVersion !== filterVersionRef.current) return;

        const message = error instanceof Error ? error.message : 'Failed to load characters';

        toast.error(message, { id: 'fetch-characters-error' });
        setCharacters([]);
        setHasMore(false);
        setIsLoadingInitial(false);
      }
    };

    fetchInitial();

    return () => controller.abort();
  }, [filterParams]);

  const loadMore = useCallback(async () => {
    if (!hasMore || isFetchingMore || isLoadingInitial) return;

    const filterVersion = filterVersionRef.current;

    setIsFetchingMore(true);

    try {
      const nextPage = page + 1;
      const data = await getCharacters({ ...filterParams, page: nextPage });

      if (filterVersion !== filterVersionRef.current) return;

      setCharacters((prev) => [...prev, ...data.results]);
      setHasMore(data.info.next !== null);
      setPage(nextPage);
    } catch (error: unknown) {
      if (filterVersion !== filterVersionRef.current) return;

      const message = error instanceof Error ? error.message : 'Failed to load more characters';

      toast.error(message, { id: 'fetch-more-error' });
    } finally {
      if (filterVersion === filterVersionRef.current) {
        setIsFetchingMore(false);
      }
    }
  }, [hasMore, isFetchingMore, isLoadingInitial, page, filterParams]);

  return { characters, hasMore, isLoadingInitial, isFetchingMore, loadMore };
};
