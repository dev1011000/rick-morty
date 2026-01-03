import { Outlet } from 'react-router-dom';

import Footer from '@/shared/components/footer';
import Header from '@/shared/components/header';

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