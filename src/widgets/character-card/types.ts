export type CharacterStatus = 'Alive' | 'Dead' | 'unknown';

export type CharacterCardMode = 'view' | 'edit';

export interface CharacterCardData {
  id: number;
  name: string;
  image: string;
  gender: string;
  species: string;
  location: string;
  status: CharacterStatus;
}
