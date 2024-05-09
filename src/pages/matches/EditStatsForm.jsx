import { useFormik } from 'formik';
import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { updateCaller } from '../../services/api';
import { AiOutlineClose } from 'react-icons/ai'
import Swal from 'sweetalert2';
import { icon, toastData } from '../Toast';
const success = Swal.mixin(toastData.success)
const toastSign = async () => {
    await success.fire(Object.assign(icon.success, { title: "news Add successfully" }))

}

const EditStatsForm = () => {
    const navigate = useNavigate()
    const { state } = useLocation();

    const getSingleNews = state?.singleNews ?? {}
    console.log(getSingleNews)
    const isAddMode = !getSingleNews.news_id

    useEffect(() => {
        const getUpdatedData = async () => {
            const res = await getSingleNews
            formik.setValues(values => ({
                ...values,
                news_id: res.news_id,
                heading: res.heading,
                sub_heading: res.sub_heading,
                content: res.content,
                cover_image: res.cover_image,
            }))
        }
        getUpdatedData()
    }, [])

    const formik = useFormik({
        initialValues: {
            heading: "",
            sub_heading: "",
            content: "",
            docs: null,
        },
        // validationSchema: validationLogin,
        onSubmit: async (values) => {

            if (isAddMode) {
                const formData = new FormData();
                formData.append("heading", values.heading)
                formData.append("sub_heading", values.sub_heading)
                formData.append("content", values.content)
                formData.append("docs", values.docs, values.docs.name)

                console.log(formData)
                // return
                // const res = await postCaller(`admin/v1/insertNews`, formData)
                const response = await fetch(`${process.env.REACT_APP_BASE_URL}/admin/v1/insertNews`,
                    {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        },
                        body: formData
                    }
                ).then(response => response.json()).catch(error => console.log(error))

                // if (res.status === 'success') {
                //   alert(res.message)
                //   navigate('/news')
                // }
                // else {
                //   alert(res.errMsg)
                // }
            }
            else {
                const res = await updateCaller(`admin/v1/updateNews/${getSingleNews.news_id}`, values)
                console.log(res)
                // if (res.status === 'success') {
                //   alert(res.message)
                //   navigate('/news')
                // }
                // else {
                //   alert(res.errMsg)
                // }
            }
            // navigate('/news')


        },



    });
    return (
        <>
            < div className="main-container">
                <div className="form-content-1">
                    <div>
                        <div className='form-heading'>
                            <p>{isAddMode ? "Edit Stats" : "Update Stats"}</p>
                            <AiOutlineClose className='ai-close' onClick={() => navigate("/matches/teams/:id")} />
                        </div>
                        <form onSubmit={formik.handleSubmit}>
                            <div className='form-input-head'>
                                <div className="form-input-field">
                                    <label htmlFor="date"> Team Name <span style={{ color: 'red' }}>*</span> </label> <br />
                                    <input type="text" name="heading" id="heading" placeholder='Team Name'
                                        onChange={formik.handleChange}
                                        value={formik.values.heading}
                                        className='input-field'
                                    // onBlur={formik.handleBlur} 

                                    />

                                    {/* { formik.errors.password && formik.touched.password &&  <span className="error" style={{ color: "red" }}>
                                     {formik.errors.password}
                                    </span>} */}
                                </div>
                                <div className="form-input-field">
                                    <label htmlFor="date"> Player Name <span style={{ color: 'red' }}>*</span> </label> <br />
                                    <input type="text" name='sub_heading' placeholder='Player Name'
                                        onChange={formik.handleChange}
                                        value={formik.values.sub_heading}
                                        //  onBlur={formik.handleBlur}
                                        className='input-field' />
                                    {/* { formik.errors.password && formik.touched.password &&  <span className="error" style={{ color: "red" }}>
                                              {formik.errors.password}
                                                   </span>} */}
                                </div>

                                <div className="form-input-field">
                                    <label htmlFor=""> Player Image <span style={{ color: 'red' }}>*</span> </label> <br />
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
                                <div className="form-input-field">
                                    <label htmlFor="date"> DOB <span style={{ color: 'red' }}>*</span> </label> <br />
                                    <input type="text" name='content' placeholder=''
                                        //  onBlur={formik.handleBlur}
                                        value={formik.values.content}
                                        onChange={formik.handleChange}
                                        className='input-field' />
                                    {/* { formik.errors.password && formik.touched.password &&  <span className="error" style={{ color: "red" }}>
                                                 {formik.errors.password}
                                            </span>} */}
                                </div>

                                <div className="form-input-field">
                                    <label htmlFor="date"> Jersey Name <span style={{ color: 'red' }}>*</span> </label> <br />
                                    <input type="text" name='content' placeholder=''
                                        //  onBlur={formik.handleBlur}
                                        value={formik.values.content}
                                        onChange={formik.handleChange}
                                        className='input-field' />
                                    {/* { formik.errors.password && formik.touched.password &&  <span className="error" style={{ color: "red" }}>
                                                   {formik.errors.password}
                                                     </span>} */}
                                </div>

                                <div className="form-input-field">
                                    <label htmlFor="date"> Gender <span style={{ color: 'red' }}>*</span> </label> <br />
                                    <input type="text" name='content' placeholder=''
                                        //  onBlur={formik.handleBlur}
                                        value={formik.values.content}
                                        onChange={formik.handleChange}
                                        className='input-field' />
                                    {/* { formik.errors.password && formik.touched.password &&  <span className="error" style={{ color: "red" }}>
                                                   {formik.errors.password}
                                                  </span>} */}
                                </div>

                                <div className="form-input-field">
                                    <label htmlFor="date"> Nationality <span style={{ color: 'red' }}>*</span> </label> <br />
                                    <input type="text" name='content' placeholder=''
                                        //  onBlur={formik.handleBlur}
                                        value={formik.values.content}
                                        onChange={formik.handleChange}
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

export default EditStatsForm