import bigLogo from '@/assets/images/big-logo.png';
import Loader from '@/shared/components/loader';

import './character-list.css';

const CharacterListPage = () => {
  return (
    <div className='character-list'>
       <div className="character-list__top">
        <img
          src={bigLogo}
          alt="Rick and Morty"
          className="character-list__logo"
        />
      </div>

      <div className='character-list__loader'>
        <Loader
          size='large'
          caption='Loading characters...'
        />
      </div>
    </div>
  );
};

export default CharacterListPage;
