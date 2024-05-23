import React, { useEffect, useState } from 'react'
import './login.css'
import Swal from "sweetalert2";
import { IoPersonAddOutline } from "react-icons/io5";
import { IoKeyOutline } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { FiEyeOff, FiEye } from 'react-icons/fi'
import { ROUTES } from '../routes/Routes';
import { postCaller } from '../services/api';

const OperatorLogin = ({ toggleForm }) => {
    const navigate = useNavigate()
    const [userId, setUserId] = useState()
    const [clientSecret, setClientSecret] = useState()

    const [type, setType] = useState('client_secret');
    const [icon, setIcon] = useState(<FiEyeOff style={{ color: "#8B8B8B", fontSize: "1.2rem", cursor: "pointer" }} />);
    // const user_idRegExp = /^((\\+[1-9]{1,4}[ \\-])|(\\([0-9]{2,3}\\)[ \\-])|([0-9]{2,4})[ \\-])?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

    // const validationLogin = Yup.object().shape({
    //   user_id: Yup.string().matches(user_idRegExp, 'user_id number is not valid').required('Mobile Number is Required'),
    //   client_secret: Yup.string()
    //     .required('client_secret is Required'),

    // });
    const formik = useFormik({
        initialValues: {
            user_id: "",
            client_secret: "",
        },

        // validationSchema:validationLogin,
        onSubmit: async (values) => {
            console.log(values)
              let url = `${process.env.REACT_APP_BASE_URL}/login/operator`
              const res = await (await fetch(url, {
                method: 'POST',
                headers: {
                  "content-type": 'application/json',
                  'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }, body: JSON.stringify(values)
              })).json();
            // const res = await postCaller('login/operator', { name: userId, name: clientSecret })
            if (res.status !== true) {
                const Toast = Swal.mixin({
                    toast: false,
                    position: 'top',
                    background: "red",
                    color: "white",
                    showConfirmButton: false,
                    timer: 2000,
                    width: 450,
                    padding: ".5rem"
                })

                Toast.fire({
                    icon: 'error',
                    iconColor: "white",
                    title: res.msg
                })
            } else {
                console.log(res)
                localStorage.setItem('token', res.Token)
                localStorage.setItem('role', res.role)
                navigate(ROUTES.DASHBOARD)
            }

        },
    });


    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate(ROUTES.DASHBOARD);

        }
    }, [])


    const handleToggle = () => {
        if (type === 'client_secret') {
            setIcon(<FiEye style={{ color: "#8B8B8B", fontSize: "1.2rem", cursor: "pointer" }} />);
            setType('text')
        } else {
            setIcon(<FiEyeOff style={{ color: "#8B8B8B", fontSize: "1.2rem", cursor: "pointer" }} />)
            setType('client_secret')
        }
    }

    return (

        <div className='login-container'>
            <div className="login-form-container">
                <div className="main-input-container">
                    <div className="login-logo">
                        <h1 style={{ color: "white" }}><samp style={{ color: "#38ca07" }}>Avi</samp>ator</h1>
                    </div>
                    <div className="sign-in-content">
                        <h2>Sign in for Operator </h2>
                        <p className='regular-para-2'>Please enter your details</p>
                    </div>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="">
                            <div className="input-container">
                                <IoPersonAddOutline style={{ color: "#8B8B8B" }} /><input type="text" name="user_id" id="user_id" placeholder='User Id' onChange={formik.handleChange}
                                    value={formik.values.user_id}
                                    onBlur={formik.handleBlur} />
                            </div>
                            {formik.errors.user_id && formik.touched.user_id && <span className="error" style={{ color: "red" }}>
                                {formik.errors.user_id}
                            </span>}
                            <div className="input-container">
                                <IoKeyOutline style={{ color: "#8B8B8B" }} /><input type={type} name="client_secret" placeholder='Secret Key' id="client_secret" onChange={formik.handleChange}
                                    value={formik.values.client_secret}
                                    onBlur={formik.handleBlur} /> <span onClick={handleToggle}>
                                    {icon}
                                </span>
                            </div>
                            {formik.errors.client_secret && formik.touched.client_secret && <span className="error" style={{ color: "red" }}>
                                {formik.errors.client_secret}
                            </span>}

                            <div className="sign-in-btn">
                                <div className="">
                                    <button type='submit'> sign in</button>
                                </div>
                                <div >
                                    <Link to className='link-button' onClick={() => toggleForm()}>For Admin</Link>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default OperatorLogin