import { RouterProvider } from 'react-router-dom';

import { router } from '@/router';
import { ErrorBoundary } from '@/shared/components';

function App() {
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
}

export default App;
