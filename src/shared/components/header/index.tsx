import LangIcon from '@/assets/icons/language.svg?react';
import LogoIcon from '@/assets/icons/logo.svg?react';
import ThemeIcon from '@/assets/icons/theme.svg?react';

import './header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header__logo">
        <LogoIcon />
      </div>

      <div className="header__actions">
        <button
          type="button"
          className="header__action"
        >
          <ThemeIcon />
        </button>

        <button
          type="button"
          className="header__action"
        >
          <LangIcon />
        </button>
      </div>
    </header>
  );
};

export default Header;
