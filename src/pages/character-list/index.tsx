import { BigLogoImage, CardImage } from '@/assets';
import { CharacterCardWidget } from '@/widgets';

import './character-list.scss';

const CharacterListPage = () => {
  return (
    <div className='character-list'>
      <div className='character-list__top'>
        <img
          src={BigLogoImage}
          alt='Rick and Morty'
          className='character-list__logo'
        />
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
