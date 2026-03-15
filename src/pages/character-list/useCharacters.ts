import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

import { getCharacters } from '@/entities/character';
import { useDebounce } from '@/shared/lib';
import type { CharacterCardData, CharacterStatus } from '@/widgets';
import type { FilterPanelValues } from '@/widgets';

import { toCardData } from './mappers';

export const useCharacters = (filters: FilterPanelValues) => {
  const [characters, setCharacters] = useState<CharacterCardData[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [isLoadingInitial, setIsLoadingInitial] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const debouncedName = useDebounce(filters.name);
  const { status, species, gender } = filters;

  const filterVersionRef = useRef(0);
  const loadMoreControllerRef = useRef<AbortController | null>(null);

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
      setPage(0);

      try {
        const data = await getCharacters({ ...filterParams, page: 0 }, controller.signal);

        if (filterVersion !== filterVersionRef.current) return;

        setCharacters(data.results.map(toCardData));
        setHasMore(data.info.next !== null);
        setIsLoadingInitial(false);
      } catch (error: unknown) {
        if (axios.isCancel(error)) return;
        if (filterVersion !== filterVersionRef.current) return;

        const message = error instanceof Error ? error.message : 'Failed to load characters';

        toast.error(message, { id: 'fetch-characters-error' });
        setCharacters([]);
        setHasMore(false);
        setIsLoadingInitial(false);
      }
    };

    fetchInitial();

    return () => {
      controller.abort();
      loadMoreControllerRef.current?.abort();
      loadMoreControllerRef.current = null;
    };
  }, [filterParams]);

  const loadMore = useCallback(async () => {
    if (!hasMore || isFetchingMore || isLoadingInitial) return;

    const filterVersion = filterVersionRef.current;
    const controller = new AbortController();
    loadMoreControllerRef.current = controller;

    setIsFetchingMore(true);

    try {
      const nextPage = page + 1;
      const data = await getCharacters({ ...filterParams, page: nextPage }, controller.signal);

      if (filterVersion !== filterVersionRef.current) return;

      setCharacters((prev) => [...prev, ...data.results.map(toCardData)]);
      setHasMore(data.info.next !== null);
      setPage(nextPage);
    } catch (error: unknown) {
      if (axios.isCancel(error)) return;
      if (filterVersion !== filterVersionRef.current) return;

      const message = error instanceof Error ? error.message : 'Failed to load more characters';

      toast.error(message, { id: 'fetch-more-error' });
    } finally {
      if (filterVersion === filterVersionRef.current) {
        setIsFetchingMore(false);
      }
      if (loadMoreControllerRef.current === controller) {
        loadMoreControllerRef.current = null;
      }
    }
  }, [hasMore, isFetchingMore, isLoadingInitial, page, filterParams]);

  const updateCharacter = useCallback(
    (payload: { id: number; name: string; status: CharacterStatus; location: string }) => {
      setCharacters((prev) =>
        prev.map((character) =>
          character.id === payload.id
            ? { ...character, name: payload.name, status: payload.status, location: payload.location }
            : character
        )
      );
    },
    []
  );

  return { characters, hasMore, isLoadingInitial, isFetchingMore, loadMore, updateCharacter };
};
