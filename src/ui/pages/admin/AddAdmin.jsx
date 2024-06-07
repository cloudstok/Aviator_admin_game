import React from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../routes/Routes';
import '../../components/model/model.css';
import Swal from 'sweetalert2';
import { icon, toastData } from '../../components/toast/Toast';
import { postCaller } from '../../../services/api';
import * as Yup from 'yup';

const success = Swal.mixin(toastData.success);

const AddAdmin = ({ show, setShowModal, operatorTable }) => {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name: '',
            currency: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Required'),
            currency: Yup.string().required('Required'),
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                const res = await postCaller('superAdmin/admin', values);
                if (res?.status === true) {
                    success.fire(Object.assign(icon.success, { title: res.msg })).then(() => (
                        navigate(ROUTES.OPERATOR)
                    ));
                }
                resetForm();
                handleClose();
                operatorTable();
            } catch (error) {
                console.error('Error sending data', error);
                Swal.fire(Object.assign(icon.error, { title: 'Error sending data' }));
            }
        },
    });

    if (!show) return null;

    const handleClose = () => {
        setShowModal(false);
    };

    return (
        <div className={`modal ${show ? 'show' : ''}`}>
            <div className="modal-content">
                <div className='add-operator'>
                    <h2>Add Admin</h2>
                    <span className="close" onClick={handleClose}>&times;</span>
                </div>
                <div className="form-container-data">
                    <form onSubmit={formik.handleSubmit}>
                        <label htmlFor='name'>User Name:</label>
                        <input
                            id="name"
                            type="text"
                            {...formik.getFieldProps('name')}
                            placeholder="Enter user name"
                        />
                        {formik.touched.name && formik.errors.name ? (
                            <div className="error">{formik.errors.name}</div>
                        ) : null}

                        <div className='currency'>
                            <label htmlFor='currency'>Currency:</label>
                            <select
                                id="currency"
                                {...formik.getFieldProps('currency')}
                            >
                                <option value="" disabled>Select currency</option>
                                <option value="USD">USD</option>
                                <option value="EUR">EUR</option>
                                <option value="GBP">GBP</option>
                            </select>
                            {formik.touched.currency && formik.errors.currency ? (
                                <div className="error">{formik.errors.currency}</div>
                            ) : null}
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
