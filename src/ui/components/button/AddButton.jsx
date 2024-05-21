import React from 'react';
import './button.css'

const AddButton = ({ name, handleOpenModal }) => {
  return (
    <div className='Button-container'>
    <button onClick={handleOpenModal}>{name}</button>
    </div>
  );
};

export default AddButton;
