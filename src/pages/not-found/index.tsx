import { Link } from 'react-router-dom';

import { NotFoundImage } from '@/assets';

import './not-found.scss';

const NotFoundPage = () => (
  <section className='not-found'>
    <div className='not-found__content'>
      <img src={NotFoundImage} alt='404 Not Found' className='not-found__image' />

      <Link to='/' className='not-found__home-link'>
        Go to main page
      </Link>
    </div>
  </section>
);

export default NotFoundPage;
