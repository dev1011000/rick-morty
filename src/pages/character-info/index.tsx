import { useNavigate } from 'react-router-dom';

import { ArrowLeftIcon } from '@/assets';
import type { ApiCharacter } from '@/entities/character';
import { Loader } from '@/shared/components';

import { useCharacterInfo } from './useCharacterInfo';

import './character-info.scss';

type InfoFieldKey = 'gender' | 'status' | 'species' | 'origin' | 'type' | 'location';

const INFO_FIELDS: Array<{ label: string; key: InfoFieldKey }> = [
  { label: 'Gender', key: 'gender' },
  { label: 'Status', key: 'status' },
  { label: 'Species', key: 'species' },
  { label: 'Origin', key: 'origin' },
  { label: 'Type', key: 'type' },
  { label: 'Location', key: 'location' },
];

const getFieldValue = (character: ApiCharacter, key: InfoFieldKey): string => {
  if (key === 'origin') return character.origin.name || 'Unknown';
  if (key === 'location') return character.location.name || 'Unknown';

  return character[key] || 'Unknown';
};

const CharacterInfoPage = () => {
  const navigate = useNavigate();
  const { character, isLoading } = useCharacterInfo();

  return (
    <div className='character-info'>
      <div className='character-info__top'>
        <button
          type='button'
          className='character-info__back'
          onClick={() => navigate(-1)}
        >
          <ArrowLeftIcon />
          <span className='character-info__back-text'>GO BACK</span>
        </button>
      </div>

      {isLoading && (
        <div className='character-info__loader'>
          <Loader size='large' caption='Loading character card...' />
        </div>
      )}

      {!isLoading && character && (
        <div className='character-info__content'>
          <img
            className='character-info__avatar'
            src={character.image}
            alt={character.name}
          />

          <h1 className='character-info__name'>{character.name}</h1>

          <p className='character-info__section-title'>Information</p>

          <div className='character-info__fields'>
            {INFO_FIELDS.map(({ label, key }) => (
              <div key={key} className='character-info__field'>
                <span className='character-info__field-label'>{label}</span>
                <span className='character-info__field-value'>{getFieldValue(character, key)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CharacterInfoPage;
