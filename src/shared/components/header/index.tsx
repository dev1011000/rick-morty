import { LanguageIcon, LogoIcon, ThemeIcon} from '@/assets';

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
          <LanguageIcon />
        </button>
      </div>
    </header>
  );
};

export default Header;
