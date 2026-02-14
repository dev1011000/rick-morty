export type CharacterStatus = 'Alive' | 'Dead' | 'Unknown';

export type CharacterCardMode = 'view' | 'edit';

export interface CharacterCardData {
  id: string;
  name: string;
  image: string;
  gender: string;
  species: string;
  location: string;
  status: CharacterStatus;
}
