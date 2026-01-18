import { useNavigate } from 'react-router-dom';

import { ArrowLeftIcon } from '@/assets';
import Loader from '@/shared/components/loader';

import './character-info.css';

const CharacterInfoPage = () => {
  const navigate = useNavigate();

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

      <div className='character-info__loader'>
        <Loader
          size='large'
          caption='Loading character card...'
        />
      </div>
    </div>
  );
};

export default CharacterInfoPage;
