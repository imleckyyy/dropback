import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Select = ({ defaultOption, options, onInputChange }) => {
  const [selectedOption, setSelectedOption] = useState(defaultOption);

  const handleChange = (e) => {
    const value = Number(e.target.value);
    setSelectedOption(value);
    onInputChange(value);
  };

  return (
    <select value={selectedOption} onChange={handleChange}>
      {options.map((item) => (
        <option key={item.value} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  );
};

Select.propTypes = {
  defaultOption: PropTypes.number.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onInputChange: PropTypes.func.isRequired,
};

export default Select;
