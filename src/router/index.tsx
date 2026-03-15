import { createBrowserRouter } from 'react-router-dom';

import CharacterInfoPage from '@/pages/character-info';
import CharacterListPage from '@/pages/character-list';
import NotFoundPage from '@/pages/not-found';
import { Layout } from '@/shared/components';

export const router = createBrowserRouter(
  [
    {
      element: <Layout />,
      children: [
        {
          index: true,
          element: <CharacterListPage />,
        },
        {
          path: 'character/:id',
          element: <CharacterInfoPage />,
        },
        {
          path: '404',
          element: <NotFoundPage />,
        },
        {
          path: '*',
          element: <NotFoundPage />,
        },
      ],
    },
  ],
  {
    basename: '/rick-morty/',
  }
);
