import React from 'react';
import '../styles/TemplatePage.scss';
import useSearch from '../customHooks/useSearch';

interface TemplatePageProps {
    title: string;
    children?: React.ReactNode;
}

const TemplatePage = (props: TemplatePageProps) => {
  const {title, children} = props
  const { searchQuery } = useSearch(); 

  return (
    <div className="template">
      <div className="main-container">
        <h1 className='template__title'>{title === "Search" ? `Search results: "${searchQuery}"` : title}</h1>
        <div className='template__container'>
            {children}
        </div>
      </div>
    </div>
  );
};

export default TemplatePage;