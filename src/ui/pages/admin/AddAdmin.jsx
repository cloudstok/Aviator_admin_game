import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../routes/Routes';
import '../../components/model/model.css';
import Swal from 'sweetalert2';
import { icon, toastData } from '../../components/toast/Toast';
import { postCaller } from '../../../services/api';

const success = Swal.mixin(toastData.success);
const error = Swal.mixin(toastData.error);

const AddAdmin = ({ show, setShowModal, operatorTable }) => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [currency, setCurrency] = useState('');
    const password = useState('');


    if (!show) return null;

    const handleClose = () => {
        setShowModal(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await postCaller('superAdmin/admin', { name, currency });
            if (res?.status === true) {
                window.alert(`Plz Copy the Password from here,\n Password = ${res.password} \n userID =${res.user_id}`)
                success.fire(Object.assign(icon.success, { title: res.msg })).then(() => (
                    navigate(ROUTES.OPERATOR)
                ));
            }
            setName("");
            setCurrency("");
            handleClose()
            operatorTable()


        } catch (error) {
            console.error('Error sending data', error);
            error.fire(Object.assign(icon.error, { title: 'Error sending data' }));
        }
    };

    return (
        <div className={`modal ${show ? 'show' : ''}`}>
            <div className="modal-content">
                <div className='add-operator'>
                    <h2>Add Admin</h2>
                    <span className="close" onClick={handleClose}>&times;</span>
                </div>
                <div className="form-container-data">
                    <form onSubmit={handleSubmit}>
                        <label htmlFor='user_name'>User Name:</label>
                        <input
                            type="text"
                            value={name}
                            password={password}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter user name"
                        />
                        <div className='' style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
                            <label htmlFor='currency'>Currency:</label>
                            <select
                                value={currency}
                                onChange={(e) => setCurrency(e.target.value)}   >
                                <option value="" disabled>Select currency</option>
                                <option value="USD">USD</option>
                                <option value="EUR">EUR</option>
                                <option value="GBP">GBP</option>
                                {/* Add more currencies as needed */}
                            </select>
                        </div>
                        <div className='form-submit-btn'>
                            <button type="submit">Send Data</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddAdmin;
