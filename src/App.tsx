import React, { useState } from 'react';
import './App.scss';
import PostList  from './components/PostList';
import Checkbox  from './components/Checkbox';
import RadioButton from './components/RadioButton';

function App()  {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (checked: boolean) => {
    setIsChecked(checked);
  };

  const [selectedOption, setSelectedOption] = useState('Radio 1');

  const handleOptionChange = (value: string | number) => {
    setSelectedOption(value.toString());
  };

  return (
    <div>
      <Checkbox label={'Checkbox 1'} checked={isChecked} onChange={handleCheckboxChange} />
      <Checkbox label={'Checkbox 2'} onChange={handleCheckboxChange} />
      <Checkbox label={'Checkbox 3'} onChange={handleCheckboxChange} />
      <Checkbox label={'Checkbox 4'} disabled />
      <RadioButton
        label="Radio 1"
        value="Radio 1"
        checked={selectedOption === 'Radio 1'}
        onChange={handleOptionChange}
      />
      <RadioButton
        label="Radio 2"
        value="Radio 2"
        checked={selectedOption === 'Radio 2'}
        onChange={handleOptionChange}
      />
      <RadioButton
        label="Radio 3"
        value="Radio 3"
        checked={selectedOption === 'Radio 3'}
        onChange={handleOptionChange}
      />
      <RadioButton
        label="Radio 4"
        value="Radio 4"
        checked={selectedOption === 'Radio 4'}
        onChange={handleOptionChange}
        disabled
      />
      <PostList />
    </div>
  );
};

export default App;

