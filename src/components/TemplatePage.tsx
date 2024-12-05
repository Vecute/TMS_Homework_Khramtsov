import React from 'react';
import '../styles/TemplatePage.scss';

interface TemplatePageProps {
    title: string;
    children?: React.ReactNode;
}

const TemplatePage = (props: TemplatePageProps) => {
  const {title, children} = props
  return (
    <div className="template">
      <div className="main-container">
        <h1 className='template__title'>{title}</h1>
        <div className='template__container'>
            {children}
        </div>
      </div>
    </div>
  );
};

export default TemplatePage;