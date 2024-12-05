import React from 'react';
import '../styles/Footer.scss';

interface FooterProps {
  children?: React.ReactNode;
}

const Footer = (props: FooterProps) => {
  const {children} = props
  return (
    <footer className="footer">
        <div className="main-container footer__container">
          {children}
        </div>
    </footer>
  );
};

export default Footer;
