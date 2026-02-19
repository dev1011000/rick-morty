import { useState } from 'react';

import { BigLogoImage, CardImage } from '@/assets';
import type { FilterPanelValues } from '@/widgets';
import { CharacterCardWidget, FilterPanelWidget } from '@/widgets';

import './character-list.scss';

const CharacterListPage = () => {
  const [filterValues, setFilterValues] = useState<FilterPanelValues>({
    name: '',
    status: '',
    species: '',
    gender: '',
  });

  return (
    <div className='character-list'>
      <div className='character-list__top'>
        <img
          src={BigLogoImage}
          alt='Rick and Morty'
          className='character-list__logo'
        />
      </div>

      <div className='character-list__filters'>
        <FilterPanelWidget values={filterValues} onChange={setFilterValues} />
      </div>

      <div style={{ marginTop: '40px' }}>
        <CharacterCardWidget
          data={{
            id: '1',
            name: 'Rick Sanchez',
            image: CardImage,
            gender: 'Male',
            species: 'Human',
            location: 'Earth',
            status: 'Alive',
          }}
        />
      </div>
    </div>
  );
};

export default CharacterListPage;
