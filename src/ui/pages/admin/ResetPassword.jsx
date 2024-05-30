import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';



const ResetPassword = ({ password, setPassword, userId }) => {

    const initialValues = {
        password: '',

    };

    const validationSchema = Yup.object({
        password: Yup.string().required('Old Password is required'),

    });

    const handleSubmit = async (values, { setSubmitting, setStatus, resetForm }) => {
        setStatus({ error: '', success: '' });
        setSubmitting(true);

        try {

            let url = `${process.env.REACT_APP_BASE_URL}/superAdmin/change/password`
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`

                },
                body: JSON.stringify({
                    password: values.password,
                    user_id: userId
                }),
            });

            if (response.ok) {
                setStatus({ success: 'Password changed successfully!', error: '' });
                resetForm();
            } else {
                const errorData = await response.json();
                setStatus({ error: errorData.message || 'Something went wrong', success: '' });
            }
        } catch (error) {
            setStatus({ error: 'Network error: Unable to change password', success: '' });
        }

        setSubmitting(false);
    };


    return (
        <div>
            <div className={`modal ${password ? 'show' : ''}`}>
                <div className="modal-content">
                    <div className='add-operator'>
                        <h2>Reset Password</h2>
                        <span className="close" onClick={() => setPassword(false)}>&times;</span>
                    </div>

                    <div className="form-container-data">
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ isSubmitting, status }) => (
                                <Form>
                                    <div>
                                        <label htmlFor="Password">Password:</label>
                                        <Field
                                            type="password"
                                            id="password"
                                            name="password"
                                            placeholder="Enter Your Password"
                                        />
                                        <ErrorMessage name="Password" component="div" style={{ color: 'red' }} />
                                    </div>


                                    {status && status.error && <p style={{ color: 'red' }}>{status.error}</p>}
                                    {status && status.success && <p style={{ color: 'green' }}>{status.success}</p>}

                                    <div className="form-submit-btn">
                                        <button type="submit" disabled={isSubmitting}>
                                            {isSubmitting ? 'Submitting...' : 'Send Data'}
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword
