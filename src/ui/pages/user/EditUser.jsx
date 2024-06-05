// import React, { useEffect } from 'react';
// import PropTypes from 'prop-types';
// import { ROUTES } from '../../../routes/Routes';
// import { updateCaller } from '../../../services/api';
// import Swal from 'sweetalert2';
// import { icon, toastData } from '../../components/toast/Toast';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import '../../components/model/model.css';

// const success = Swal.mixin(toastData.success);

// const EditUser = ({ edit, setEdit, UserData, user_id }) => {
//     const navigate = useNavigate();
//     const { state } = useLocation();
//     const geteditUserList = state?.editUserList ?? {}

//     useEffect(() => {
//         const getUpdatedData = async () => {
//             const res = await geteditUserList
//             formik.setValues(values => ({
//               ...values,
//               name: res.name,
//               image: res.url,
//               email: res.email,
//               phone: res.phone,
//               currency:res.currency
//             }))
//           }
//           getUpdatedData()
//           console.log('Received user_id:', user_id);

//         },  [user_id]);


//     const formik = useFormik({
//         initialValues: {
//             name: UserData?.name,
//             image: null,
//             email: UserData?.email,
//             phone: UserData?.phone,
//             currency: UserData?.currency,
//         },
//         validationSchema: Yup.object({
//             name: Yup.string().required('User Name is required'),
//             image: Yup.mixed().required('Profile image is required'),
//             email: Yup.string().email('Invalid email format').required('Email is required'),
//             phone: Yup.string().matches(/^[0-9]+$/, 'Phone number must be digits only').required('Phone is required'),
//             currency: Yup.string().required('Currency is required'),
//         }),
//         onSubmit: async (values, { setSubmitting, resetForm }) => {
//             try {
//                 const formData = new FormData();
//                 formData.append('name', values.name);
//                 formData.append('file', values.image);
//                 formData.append('email', values.email);
//                 formData.append('phone', values.phone);
//                 formData.append('currency', values.currency);

//                 const res = await updateCaller(`admin/users?user_id=${user_id}`, values);
//                 if (res.status === true) {
//                     success.fire(Object.assign(icon.success, { title: res.msg })).then(() => navigate(ROUTES.USERLIST));
//                 }
//                 resetForm();
//                 handleClose();
//             } catch (error) {
//                 console.error('Error sending data', error);
//                 Swal.fire(Object.assign(icon.error, { title: 'Error sending data' }));
//             } finally {
//                 setSubmitting(false);
//             }
//         },
//     });

//     const handleClose = () => {
//         setEdit(false);
//     };

//     return (
//         <div className={`modal ${edit ? 'show' : ''}`}>
//             <div className="modal-content">
//                 <div className='add-operator'>
//                     <h2>Edit User</h2>
//                     <span className="close" onClick={handleClose}>&times;</span>
//                 </div>
//                 <div className="form-container-data">
//                     <form onSubmit={formik.handleSubmit}>
//                         <label htmlFor='name'>User Name:</label>
//                         <input
//                             type="text"
//                             id="name"
//                             name="name"
//                             onChange={formik.handleChange}
//                             onBlur={formik.handleBlur}
//                             value={formik.values.name}
//                             placeholder="Enter user name"
//                         />
//                         {formik.touched.name && formik.errors.name ? (
//                             <div className="error" style={{ color: "red" }}>{formik.errors.name}</div>
//                         ) : null}

//                         <label htmlFor='image'>Image URL:</label>
//                         <input
//                             type="file"
//                             id="image"
//                             name="image"
//                             onChange={(event) => formik.setFieldValue('image', event.currentTarget.files[0])}
//                             onBlur={formik.handleBlur}
//                         />
//                         {formik.touched.image && formik.errors.image ? (
//                             <div className="error" style={{ color: "red" }}>{formik.errors.image}</div>
//                         ) : null}

//                         <label htmlFor='email'>Email:</label>
//                         <input
//                             type="email"
//                             id="email"
//                             name="email"
//                             onChange={formik.handleChange}
//                             onBlur={formik.handleBlur}
//                             value={formik.values.email}
//                             placeholder="Enter the email"
//                         />
//                         {formik.touched.email && formik.errors.email ? (
//                             <div className="error" style={{ color: "red" }}>{formik.errors.email}</div>
//                         ) : null}

//                         <label htmlFor='phone'>Phone:</label>
//                         <input
//                             type="text"
//                             id="phone"
//                             name="phone"
//                             onChange={formik.handleChange}
//                             onBlur={formik.handleBlur}
//                             value={formik.values.phone}
//                             placeholder="Enter phone number"
//                         />
//                         {formik.touched.phone && formik.errors.phone ? (
//                             <div className="error" style={{ color: "red" }}>{formik.errors.phone}</div>
//                         ) : null}

//                         <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
//                             <label htmlFor='currency'>Currency:</label>
//                             <select
//                                 id="currency"
//                                 name="currency"
//                                 onChange={formik.handleChange}
//                                 onBlur={formik.handleBlur}
//                                 value={formik.values.currency}
//                             >
//                                 <option value="" disabled>Select currency</option>
//                                 <option value="USD">USD</option>
//                                 <option value="EUR">EUR</option>
//                                 <option value="GBP">GBP</option>
//                             </select>
//                         </div>
//                         {formik.touched.currency && formik.errors.currency ? (
//                             <div className="error" style={{ color: "red" }}>{formik.errors.currency}</div>
//                         ) : null}

//                         <div className='form-submit-btn'>
//                             <button type="submit" disabled={formik.isSubmitting}>Send Data</button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };


// export default EditUser;