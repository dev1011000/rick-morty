import type { ApiCharacter } from '@/entities/character';
import type { CharacterCardData } from '@/widgets';

export const toCardData = (character: ApiCharacter): CharacterCardData => ({
  id: character.id,
  name: character.name,
  image: character.image,
  gender: character.gender,
  species: character.species,
  location: character.location.name,
  status: character.status,
});

