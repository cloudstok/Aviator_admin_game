import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ROUTES } from '../../../routes/Routes';
import '../../components/model/model.css';
import Swal from 'sweetalert2';
import { icon, toastData } from '../../components/toast/Toast';
import { postCaller, updateCaller } from '../../../services/api';
import { useNavigate } from 'react-router-dom';

const success = Swal.mixin(toastData.success);

const AddUser = ({ show, setShowModal, userData, edit, setEdit, editData }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (edit && editData) {
            formik.setValues({
                name: editData.name || '',
                url: editData.url || '',
                email: editData.email || '',
                phone: editData.phone || '',
                currency: editData.currency || '',
            });
        }
    }, [edit, editData]);

    const formik = useFormik({
        initialValues: {
            name: '',
            url: null,
            email: '',
            phone: '',
            currency: '',

        },
        validationSchema: Yup.object({
            name: Yup.string().required('User Name is required'),
            url: Yup.mixed().required("An image is required"),
            email: Yup.string().email('Invalid email format').required('Email is required'),
            phone: Yup.string().matches(/^[0-9]+$/, 'Phone number must be digits only').required('Phone is required'),
            currency: Yup.string().required('Currency is required')
        }),
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            try {
                if (edit) {
                    const res = await updateCaller(`admin/users?user_id=${editData.user_id}`, values);
                    if (res?.status === true) {
                        success.fire(Object.assign(icon.success, { title: res.msg })).then(() => {
                            navigate(ROUTES.USERLIST);
                        });
                    }
                } else {
                    const res = await postCaller('admin/users', values);
                    if (res?.status === true) {
                        success.fire(Object.assign(icon.success, { title: res.msg })).then(() => {
                            navigate(ROUTES.USERLIST);
                        });
                    }
                }
                resetForm();
                handleClose();
                userData();
            } catch (error) {
                console.error('Error sending data', error);
                Swal.fire(Object.assign(icon.error, { title: 'Error sending data' }));
            } finally {
                setSubmitting(false);
            }
        },
    });

    const handleClose = () => {
        setShowModal(false);
    };

    if (!show) return null;

    return (
        <div className={`modal ${show ? 'show' : ''}`}>
            <div className="modal-content">
                <div className='add-operator'>
                    <h2>{edit ? "Update User" : "Add User"}</h2>
                    <span className="close" onClick={handleClose}>&times;</span>
                </div>
                <div className="form-container-data">
                    <form onSubmit={formik.handleSubmit}>
                        <label htmlFor='name'>User Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.name}
                            placeholder="Enter user name"
                            disabled = {edit}
                        />
                        {formik.touched.name && formik.errors.name ? (
                            <div className="error">{formik.errors.name}</div>
                        ) : null}

                        <label htmlFor='url'>Upload Image:</label>
                        <input
                            type="file"
                            id="url"
                            name="url"
                            onChange={(event) => {
                                const file = event.currentTarget.files[0];
                                formik.setFieldValue("url", file);
                            }}
                            onBlur={formik.handleBlur}
                            placeholder="Upload an image file"
                        />
                        {formik.touched.url && formik.errors.url ? (
                            <div className="error">{formik.errors.url}</div>
                        ) : null}

                        <label htmlFor='email'>Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            placeholder="Enter the email"
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div className="error">{formik.errors.email}</div>
                        ) : null}

                        <label htmlFor='phone'>Phone:</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.phone}
                            placeholder="Enter phone number"
                        />
                        {formik.touched.phone && formik.errors.phone ? (
                            <div className="error">{formik.errors.phone}</div>
                        ) : null}

                        <label htmlFor='currency'>Currency:</label>
                        <select
                            id="currency"
                            name="currency"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.currency}
                        >
                            <option value="" disabled>Select currency</option>
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                            <option value="GBP">GBP</option>
                        </select>
                        {formik.touched.currency && formik.errors.currency ? (
                            <div className="error">{formik.errors.currency}</div>
                        ) : null}

                        <div className='form-submit-btn'>
                            <button type="submit" disabled={formik.isSubmitting}>Send Data</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddUser;
