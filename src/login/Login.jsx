import React, { useEffect, useState } from 'react'
import './login.css'
import Swal from "sweetalert2";

import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { FiEyeOff, FiEye } from 'react-icons/fi'
import * as Yup from 'yup';
import { FaPhone } from "react-icons/fa6";
import { MdLockOutline } from "react-icons/md";
const Login = () => {
  const navigate = useNavigate()

  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(<FiEyeOff style={{ color: "#8B8B8B", fontSize: "1.2rem", cursor: "pointer" }} />);
  // const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-])|(\\([0-9]{2,3}\\)[ \\-])|([0-9]{2,4})[ \\-])?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

  // const validationLogin = Yup.object().shape({
  //   phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Mobile Number is Required'),
  //   password: Yup.string()
  //     .required('Password is Required'),

  // });
  const formik = useFormik({
    initialValues: {
      phone: "",
      password: "",
    },

    // validationSchema:validationLogin,
    onSubmit: async (values) => {
      console.log(values)
      let url = `${process.env.REACT_APP_BASE_URL}/login`
      const res = await (await fetch(url, {
        method: 'POST',
        headers: {
          "content-type": 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }, body: JSON.stringify(values)
      })).json();
      console.log(res)
      if (res.status !== true) {
        const Toast = Swal.mixin({
          toast: true,
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
        localStorage.setItem('token', res.token)
        localStorage.setItem('phone', res?.user?.phone)
        localStorage.setItem('name', res?.user?.fname ?? "" + " " + res?.user?.mname ?? "" + " " + res?.user?.lname ?? "")


        localStorage.setItem('user_name', res?.user_name)
        navigate('/dashboard')
      }

    },
  });


  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/dashboard')

    }
  }, [])


  const handleToggle = () => {
    if (type === 'password') {
      setIcon(<FiEye style={{ color: "#8B8B8B", fontSize: "1.2rem", cursor: "pointer" }} />);
      setType('text')
    } else {
      setIcon(<FiEyeOff style={{ color: "#8B8B8B", fontSize: "1.2rem", cursor: "pointer" }} />)
      setType('password')
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
            <h2>Sign in</h2>
            <p className='regular-para-2'>Please enter your details</p>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="">
              <div className="input-container">
                <FaPhone style={{ color: "#8B8B8B" }} /><input type="number" name="phone" id="phone" placeholder='Mobile' onChange={formik.handleChange}
                  value={formik.values.phone}
                  onBlur={formik.handleBlur} />
              </div>
              {formik.errors.phone && formik.touched.phone && <span className="error" style={{ color: "red" }}>
                {formik.errors.phone}
              </span>}
              <div className="input-container">
                <MdLockOutline style={{ color: "#8B8B8B" }} /><input type={type} name="password" placeholder='Password' id="password" onChange={formik.handleChange}
                  value={formik.values.password}
                  onBlur={formik.handleBlur} /> <span onClick={handleToggle}>
                  {icon}
                </span>
              </div>
              {formik.errors.password && formik.touched.password && <span className="error" style={{ color: "red" }}>
                {formik.errors.password}
              </span>}

              <div className="sign-in-btn">
                <div className="">
                  <button type='submit'>Sign In</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>

  )
}

export default Login