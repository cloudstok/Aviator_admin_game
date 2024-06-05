import React from 'react';
import './button.css'
const WalletButton = ({ name, onClick }) => {
    return (
        <div className='Button-container'>
            <button type="button" onClick={onClick}>
                {name}
            </button>
        </div>
    );
};

export default WalletButton