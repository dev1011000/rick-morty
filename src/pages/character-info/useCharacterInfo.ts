import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

import { getCharacterById } from '@/entities/character';
import type { ApiCharacter } from '@/entities/character';

export const useCharacterInfo = () => {
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<ApiCharacter | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const controller = new AbortController();

    const fetch = async () => {
      setIsLoading(true);

      try {
        const data = await getCharacterById(Number(id), controller.signal);
        setCharacter(data);
      } catch (error: unknown) {
        if (axios.isCancel(error)) return;

        const message = error instanceof Error ? error.message : 'Failed to load character';
        toast.error(message, { id: 'fetch-character-error' });
      } finally {
        setIsLoading(false);
      }
    };

    fetch();

    return () => controller.abort();
  }, [id]);

  return { character, isLoading };
};

