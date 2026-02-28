import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import type { ApiCharacter } from '@/entities/character';
import { getCharacters } from '@/entities/character';
import { useDebounce } from '@/shared/lib';
import type { FilterPanelValues } from '@/widgets';

export const useCharacters = (filters: FilterPanelValues) => {
  const [characters, setCharacters] = useState<ApiCharacter[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const debouncedName = useDebounce(filters.name);
  const { status, species, gender } = filters;

  useEffect(() => {
    const controller = new AbortController();

    const fetchCharacters = async () => {
      setIsLoading(true);

      try {
        const params = Object.fromEntries(
          Object.entries({ name: debouncedName, status, species, gender }).filter(([, value]) => Boolean(value))
        );

        const data = await getCharacters(params, controller.signal);

        setCharacters(data.results);
        setIsLoading(false);
      } catch (error: unknown) {
        if (error instanceof Error && error.name === 'AbortError') return;

        const message = error instanceof Error ? error.message : 'Failed to load characters';

        toast.error(message, { id: 'fetch-characters-error' });
        setCharacters([]);
        setIsLoading(false);
      }
    };

    fetchCharacters();

    return () => controller.abort();
  }, [debouncedName, status, species, gender]);

  return { characters, isLoading };
};

