import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import type { ApiCharacter } from '@/entities/character';
import { getCharacters } from '@/entities/character';
import type { FilterPanelValues } from '@/widgets';

export const useCharacters = (filters: FilterPanelValues) => {
  const [characters, setCharacters] = useState<ApiCharacter[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCharacters = async () => {
      setIsLoading(true);
      try {
        const params = Object.fromEntries(
          Object.entries(filters).filter(([, value]) => Boolean(value))
        );   

        const data = await getCharacters(params);
        setCharacters(data.results);
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to load characters';
        toast.error(message, { id: 'fetch-characters-error' });
        setCharacters([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCharacters();
  }, [filters]);

  return { characters, isLoading };
};

