import { useState } from 'react';

import { BigLogoImage, SearchIcon } from '@/assets';
import { TextField } from '@/shared/components/text-field';

import './character-list.css';

const CharacterListPage = () => {
  const [name, setName] = useState('');
  const [search, setSearch] = useState('');

  return (
    <div className='character-list'>
      <div className='character-list__top'>
        <img
          src={BigLogoImage}
          alt='Rick and Morty'
          className='character-list__logo'
        />
      </div>

      <div className='character-list__controls'>
        <TextField
          variant='outlined'
          placeholder='Filter by name...'
          icon={<SearchIcon />}
          value={search}
          onChange={setSearch}
          onClear={() => setSearch('')}
        />

        <div style={{ marginTop: '40px' }}>
          <TextField
            label='Вариант для формы'
            variant='underlined'
            value={name}
            onChange={setName}
            onClear={() => setName('')}
            placeholder='Rick Sanchez'
          />
        </div>
      </div>
    </div>
  );
};

export default CharacterListPage;
