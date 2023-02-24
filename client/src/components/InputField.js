import React from 'react';
export const InputField = ({
  label,
  type = 'text',
  name,
  value,
  handleChange,
}) => {
  return (

    <div style={{display: 'flex', flexFlow: 'row nowrap'}}>
      <label className='self-center' style={{paddingRight: '5px'}}>{label}</label>
      <input
        type={type}
        className='border border-gray-200 border-solid rounded-l'
        value={value}
        name={name}
        onChange={handleChange}
      />
    </div>

  );
};
