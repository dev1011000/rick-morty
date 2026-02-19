import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { Footer, Header } from '@/shared/components';

import './layout.scss';

const Layout = () => {
  return (
    <div className="layout">
      <Header />
      <main className="layout__main">
        <Outlet />
      </main>
      <Footer />
      <Toaster
        position='bottom-right'
        containerStyle={{ bottom: 32, right: 24 }}
        toastOptions={{
          error: {
            duration: 4000,
            style: {
              background: '#18181b',
              color: '#fafafa',
              border: '1px solid #3f3f46',
              borderRadius: '8px',
              padding: '12px 16px',
              fontSize: '14px',
              fontFamily: 'Roboto, sans-serif',
              boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
              maxWidth: '320px',
            },
            iconTheme: {
              primary: '#f87171',
              secondary: '#18181b',
            },
          },
        }}
      />
    </div>
  );
};

export default Layout;
