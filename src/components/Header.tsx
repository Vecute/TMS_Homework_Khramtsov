import React from 'react';
import '../styles/Header.scss';

interface HeaderProps {
  children?: React.ReactNode;
}

const Header = (props: HeaderProps) => {
  const {children} = props
  return (
    <header className="header">
      <div className="main-container header__container">
        {children}
      </div>
    </header>
  );
};

export default Header;