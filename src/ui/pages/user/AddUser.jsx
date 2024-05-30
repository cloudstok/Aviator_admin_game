import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../routes/Routes';
import '../../components/model/model.css';
import Swal from 'sweetalert2';
import { icon, toastData } from '../../components/toast/Toast';
import { postCaller } from '../../../services/api';

const success = Swal.mixin(toastData.success);
const error = Swal.mixin(toastData.error);

const AddUser = ({ show, setShowModal, userData }) => {
    const navigate = useNavigate();
    const [name, setName] = useState('');

    if (!show) return null;

    const handleClose = () => {
        setShowModal(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await postCaller('admin/users', { name });
            if (res?.status === true) {
                success.fire(Object.assign(icon.success, { title: res.msg })).then(() => (
                    navigate(ROUTES.USERLIST)
                ));
            }
            setName("");
            handleClose()
            userData()

        } catch (error) {
            console.error('Error sending data', error);
            // error.fire(Object.assign(icon.error, { title: 'Error sending data' }));
        }
    };

    return (
        <div className={`modal ${show ? 'show' : ''}`}>
            <div className="modal-content">
                <div className='add-operator'>
                    <h2>Add User</h2>
                    <span className="close" onClick={handleClose}>&times;</span>
                </div>
                <div className="form-container-data">
                    <form onSubmit={handleSubmit}>
                        <label htmlFor='user_name'>User Name:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter user name"
                        />

                        <div className='form-submit-btn'>
                            <button type="submit">Send Data</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddUser;
