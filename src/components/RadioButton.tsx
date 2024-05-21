interface RadioButtonProps {
  label: string;
  value: string | number;
  checked?: boolean;
  onChange: (value: string | number) => void;
  disabled?: boolean;
}

const RadioButton = (props: RadioButtonProps) => {
  const {label, value, checked, onChange, disabled} = props;

  const handleChange = () => {
    onChange(value);
  };

  return (
    <label className="radio-button-container">
      <input
        type="radio"
        name="radio-group"
        value={value}
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        className="radio-button"
      />
      <span className="radio-button-circle"/>
      <span className="radio-button-label">{label}</span>
    </label>
  );
};

export default RadioButton;