import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toastData } from '../Toast';
import { icon } from '../Toast';
import { AiOutlineClose } from 'react-icons/ai';
import Swal from 'sweetalert2';
// import { postCaller, updateCaller } from '../../services/api';
import { useFormik } from 'formik';
const success = Swal.mixin(toastData.success);

const toastSign = async () => {
    await success.fire(Object.assign(icon.success, { title: "User Add successfully" }))

}
const Adduser = () => {
    const navigate = useNavigate()
    const { state } = useLocation();

    const getSingleUser = state?.singleUser ?? {}
    console.log(getSingleUser)
    const isAddMode = !getSingleUser.u_id

    useEffect(() => {
        const getUpdatedData = async () => {
            const res = await getSingleUser
            formik.setValues(values => ({
                ...values,
                name: res.name,

            }))
        }
        getUpdatedData()
    }, [])

    const formik = useFormik({
        initialValues: {
            name: "",
            docs: null,
        },
        // validationSchema: validationLogin,
        onSubmit: async (values, { resetForm }) => {

            resetForm()

        }
    });


    return (
        <>
            < div className="main-container">
                <div className="form-content">
                    <div>
                        <div className='form-heading'>
                            <p>{isAddMode ? "Add User" : "Update User"}</p>
                            <AiOutlineClose className='ai-close' onClick={() => navigate("/user")} />
                        </div>
                        <form onSubmit={formik.handleSubmit} >
                            <div className='form-input-head'>
                                <div className="form-input-field">
                                    <label htmlFor="date"> Name  </label> <br />
                                    <input type="text" name="heading" id="heading" placeholder='Enter your name'
                                        onChange={formik.handleChange}
                                        value={formik.values.heading}
                                        className='input-field'
                                    // onBlur={formik.handleBlur} 

                                    />

                                </div>
                                <div className="form-input-field">
                                    <label htmlFor="date"> Phone  </label> <br />
                                    <input type="phone" disabled name='content' placeholder='Enter your number'
                                        //  onBlur={formik.handleBlur}
                                        value={formik.values.content}
                                        onChange={formik.handleChange}
                                        className='input-field' />

                                </div>

                                <div className="form-input-field">
                                    <label htmlFor="">Profile Image  </label> <br />
                                    <input type="file"
                                        id="docs"
                                        name='docs'
                                        accept='.jpg, .jpeg, .png'
                                        onChange={(e) => {
                                            formik.setFieldValue('docs', e.currentTarget.files[0]);
                                            console.log(e.currentTarget.files[0])
                                        }}
                                        className='input-field' />
                                    {/* { formik.errors.password && formik.touched.password &&  <span className="error" style={{ color: "red" }}>
            {formik.errors.password}
          </span>} */}
                                </div>
                            </div>
                            <div className='submit-btn'>
                                <button type='submit' onClick={toastSign}>Submit</button>
                            </div>

                            {/* { formik.errors.managerPassword && formik.touched.managerPassword &&  <span className="error" style={{ color: "red",marginLeft:"1rem" }}>
              {formik.errors.managerPassword}
            </span>}
           */}
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Adduser