import { Outlet } from 'react-router-dom';

import { Footer, Header } from '@/shared/components';

import './layout.css';

const Layout = () => {
  return (
    <div className="layout">
      <Header />
      <main className="layout__main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;