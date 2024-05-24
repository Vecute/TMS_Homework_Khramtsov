import React from 'react';
import '../styles/RenderButton.scss';

interface RenderButtonProps {
  title: string;
  onButtonClick: (title: string) => void;
  buttonType?: string;
  buttonTitle?: string;
}

const RenderButton = (props: RenderButtonProps) => {
    const { title, onButtonClick, buttonType, buttonTitle } = props;
    const handleClick = () => {
    onButtonClick(title);
  };

  return (
    <button onClick={handleClick} className={buttonType ? buttonType : 'backButton'}>{buttonTitle ? buttonTitle : null}</button>
  );
};

export default RenderButton;