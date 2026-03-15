import { api } from '@/shared/api';

import type { ApiCharacter, ApiCharactersResponse } from './types';

interface GetCharactersParams {
  page?: number;
  name?: string;
  status?: string;
  species?: string;
  gender?: string;
}

export const getCharacters = async (params?: GetCharactersParams, signal?: AbortSignal): Promise<ApiCharactersResponse> => {
  const { data } = await api.get<ApiCharactersResponse>('/character', { params, signal });
  return data;
};

export const getCharacterById = async (id: number, signal?: AbortSignal): Promise<ApiCharacter> => {
  const { data } = await api.get<ApiCharacter>(`/character/${id}`, { signal });
  return data;
};
