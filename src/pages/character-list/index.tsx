import { useState } from 'react';

import { BigLogoImage } from '@/assets';
import { Loader } from '@/shared/components';
import { useInfiniteScroll } from '@/shared/lib';
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

  const { characters, hasMore, isLoadingInitial, isFetchingMore, loadMore } = useCharacters(filterValues);

  const sentinelRef = useInfiniteScroll({
    hasMore,
    isLoading: isFetchingMore || isLoadingInitial,
    onLoadMore: loadMore,
  });

  return (
    <div className='character-list'>
      <div className='character-list__sticky'>
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
      </div>

      {isLoadingInitial && (
        <Loader size='large' caption='Loading characters...' className='character-list__loader' />
      )}

      {!isLoadingInitial && (
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

      {!isLoadingInitial && hasMore && (
        <Loader ref={sentinelRef} size='small' className='character-list__loader--more' />
      )}
    </div>
  );
};

export default CharacterListPage;
