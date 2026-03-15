import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

import type { ApiCharacter } from '@/entities/character';
import { getCharacterById } from '@/entities/character';

export const useCharacterInfo = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [character, setCharacter] = useState<ApiCharacter | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      navigate('/404', { replace: true });
      return;
    }

    const controller = new AbortController();

    const fetchCharacter = async () => {
      setIsLoading(true);

      try {
        const data = await getCharacterById(Number(id), controller.signal);
        setCharacter(data);
      } catch (error: unknown) {
        if (axios.isCancel(error)) return;

        if (axios.isAxiosError(error) && error.response?.status === 404) {
          navigate('/404', { replace: true });
          return;
        }

        const message = error instanceof Error ? error.message : 'Failed to load character';
        toast.error(message, { id: 'fetch-character-error' });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCharacter();

    return () => controller.abort();
  }, [id, navigate]);

  return { character, isLoading };
};

