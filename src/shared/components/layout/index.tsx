import { Outlet } from 'react-router-dom';

import { BaseToaster, Footer, Header } from '@/shared/components';

import './layout.scss';

const Layout = () => {
  return (
    <div className="layout">
      <Header />
      <main className="layout__main">
        <Outlet />
      </main>
      <Footer />
      <BaseToaster />
    </div>
  );
};

export default Layout;
