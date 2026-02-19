import { api } from '@/shared/api';

import type { ApiCharactersResponse } from './types';

interface GetCharactersParams {
  page?: number;
  name?: string;
  status?: string;
  species?: string;
  gender?: string;
}

export const getCharacters = async (params?: GetCharactersParams): Promise<ApiCharactersResponse> => {
  const { data } = await api.get<ApiCharactersResponse>('/character', { params });
  return data;
};
