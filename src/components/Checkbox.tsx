import React, { useState } from 'react';

interface CheckboxProps {
    label?: string;
    checked?: boolean;
    disabled?: boolean;
    onChange?: (checked: boolean) => void;
}

const Checkbox = (props: CheckboxProps) => {
    const { label, checked, disabled, onChange } = props;
    const [isChecked, setIsChecked] = useState(checked || false);

    const handleChange = () => {
        setIsChecked(!isChecked);
        onChange && onChange(!isChecked);
    };

    return (
        <label className="checkbox-container">
            <input
                type="checkbox"
                checked={isChecked}
                disabled={disabled}
                onChange={handleChange}
                className="checkbox-input"
            />
            <span className={`checkbox-indicator ${isChecked ? 'checked' : ''}`}>
            {isChecked ? '✓' : ''}
            </span>
            {label}
        </label>
    );
};

export default Checkbox;