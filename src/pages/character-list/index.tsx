import { useState } from 'react';

import { BigLogoImage } from '@/assets';
import Select from '@/shared/components/select';
import type { SelectOption } from '@/shared/components/select/types';
import StatusDot, { type StatusVariant } from '@/shared/components/status-dot';

import './character-list.css';

const statusOptions: SelectOption<StatusVariant>[] = [
  { value: 'alive', label: 'Alive' },
  { value: 'dead', label: 'Dead' },
  { value: 'unknown', label: 'Unknown' }
];

const CharacterListPage = () => {
  const [status, setStatus] = useState<StatusVariant>('alive');

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
        <Select
          size='sm'
          value={status}
          onChange={setStatus}
          options={statusOptions}
          addon={<StatusDot variant={status} />}
          renderOptionAddon={(v) => <StatusDot variant={v} />}
        />
      </div>
    </div>
  );
};

export default CharacterListPage;
