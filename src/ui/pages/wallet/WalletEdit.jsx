import React, { useEffect } from 'react';
import { ROUTES } from '../../../routes/Routes';
import { updateCaller } from '../../../services/api';
import Swal from 'sweetalert2';
import { icon, toastData } from '../../components/toast/Toast';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const success = Swal.mixin(toastData.success);

const WalletEdit = ({ wallet, setWallet, updateWallet, walletData }) => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      user_id: '',
      created_by: '',
      amount: '',
    },
    validationSchema: Yup.object({
      user_id: Yup.string().required('User ID is required'),
      created_by: Yup.string().required('Created By is required'),
      amount: Yup.number()
        .required('Amount is required')
        .positive('Amount must be a positive number')
        .integer('Amount must be an integer'),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      console.log(values, "hiiiii")
      try {
        const res = await updateCaller(`admin/users/wallet?user_id=${values.user_id}`, values);
        console.log('Response:', res); // Debugging line
        if (res?.status === true) {
          success.fire(Object.assign(icon.success, { title: res.msg })).then(() => {
            navigate(ROUTES.WalletEdit); // Assuming you want to navigate to the user list after update
          });
        }
        resetForm();
        handleClose();
        walletData(); // Uncomment if you want to fetch the wallet data again
      } catch (error) {
        console.error('Error sending data', error);
        Swal.fire(Object.assign(icon.error, { title: 'Error sending data' }));
      } finally {
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    if (updateWallet) {
      console.log('Updating form values with updateWallet:', updateWallet); // Debugging line
      formik.setValues({
        user_id: updateWallet.user_id || '',
        created_by: updateWallet.created_by || '',
        amount: updateWallet.amount || '',
      });
    }
  }, [updateWallet]);

  const handleClose = () => {
    setWallet(false);
  };

  return (
    <div className={`modal ${wallet ? 'show' : ''}`}>
      <div className="modal-content">
        <div className="add-operator">
          <h2>Wallet Edit</h2>
          <span className="close" onClick={handleClose}>&times;</span>
        </div>
        <div className="form-container-data">
          <form onSubmit={formik.handleSubmit}>
            <label htmlFor="user_id">User ID:</label>
            <input
              id="user_id"
              name="user_id"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.user_id}
              placeholder="Enter user ID"
              disabled // This makes the input field read-only

            />
            {formik.touched.user_id && formik.errors.user_id ? (
              <div className="error">{formik.errors.user_id}</div>
            ) : null}

            <label htmlFor="created_by">Created By:</label>
            <input
              id="created_by"
              name="created_by"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.created_by}
              placeholder="Created By"
            />
            {formik.touched.created_by && formik.errors.created_by ? (
              <div className="error">{formik.errors.created_by}</div>
            ) : null}

            <label htmlFor="amount">Amount:</label>
            <input
              id="amount"
              name="amount"
              type="number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.amount}
              placeholder="Enter the amount"
            />
            {formik.touched.amount && formik.errors.amount ? (
              <div className="error">{formik.errors.amount}</div>
            ) : null}

            <div className="form-submit-btn">
              <button type="submit" disabled={formik.isSubmitting}>
                Send Data
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WalletEdit;
