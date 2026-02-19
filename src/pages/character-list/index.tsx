import { useState } from 'react';

import { BigLogoImage } from '@/assets';
import { Loader } from '@/shared/components';
import type { FilterPanelValues } from '@/widgets';
import { CharacterCardWidget, FilterPanelWidget } from '@/widgets';

import { useCharacters } from './useCharacters';
import './character-list.scss';

const CharacterListPage = () => {
  const [filterValues, setFilterValues] = useState<FilterPanelValues>({
    name: '',
    status: '',
    species: '',
    gender: '',
  });

  const { characters, isLoading } = useCharacters(filterValues);

  return (
    <div className='character-list'>
      <div className='character-list__top'>
        <img
          src={BigLogoImage}
          alt='Rick and Morty'
          className='character-list__logo'
        />
      </div>

      <FilterPanelWidget
        className='character-list__filters'
        values={filterValues}
        onChange={setFilterValues}
      />

      {isLoading && (
        <Loader size='large' caption='Loading characters...' className='character-list__loader' />
      )}

      {!isLoading && (
        <div className='character-list__grid'>
          {characters.map((character) => (
            <CharacterCardWidget
              key={character.id}
              data={{
                id: String(character.id),
                name: character.name,
                image: character.image,
                gender: character.gender,
                species: character.species,
                location: character.location.name,
                status: character.status,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CharacterListPage;
