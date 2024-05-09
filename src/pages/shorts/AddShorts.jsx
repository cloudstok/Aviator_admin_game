import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { AiOutlineClose } from 'react-icons/ai'
import { updateCaller } from '../../services/api'
import Swal from 'sweetalert2'
import { icon, toastData } from '../Toast'
const success = Swal.mixin(toastData.success)
const error = Swal.mixin(toastData.error)



const AddShorts = () => {
  const navigate = useNavigate()
  const { state } = useLocation();
  const getSingleShorts = state?.singleShorts ?? {}
  const isAddMode = !getSingleShorts.reel_id
  console.log(getSingleShorts)
  useEffect(() => {
    const getUpdatedData = async () => {
      const res = await getSingleShorts
      formik.setValues(values => ({
        ...values,
        reel_id: res.reel_id,
        title: res.title,
        sub_title: res.sub_title,
        cover_image: res.url,
      }))
    }
    getUpdatedData()
  }, [])

  const formik = useFormik({
    initialValues: {
      title: "",
      sub_title: "",
      cover_image: ""
    },
    // validationSchema: validationLogin,
    onSubmit: async (values) => {
      console.log(values)
      if (isAddMode) {
        const formData = new FormData();
        formData.append("title", values.title)
        formData.append("sub_title", values.sub_title)
        formData.append("docs", values?.docs, values?.docs?.name)
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/admin/v1/add/reel`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: formData
          }
        ).then(response => response.json()).catch(error => console.log(error))
     
        if (response.status === true) {
          await success.fire(Object.assign( icon.success , { title: response.msg})).then((response)=>(
            navigate('/shorts')
          ))
         
        }
        else {
          error.fire(Object.assign(icon.error, { title: response.msg }))
        }
      }
      else {
        const response = await updateCaller(`admin/v1/updateShorts`, values)
        // console.log(res)
        if (response.status === true) {
          await success.fire(Object.assign( icon.success , { title: response.msg})).then((response)=>(
            navigate('/shorts')
          ))
        }
        else {
          error.fire(Object.assign(icon.error, { title: response.msg }))
        }
      }
    },
  });


  return (

    < div className="main-container">
      <div className="form-content">
        <div>
          <div className='form-heading'>
            <p>{isAddMode ? "Add Shorts" : "Update Shorts"}</p>
            <AiOutlineClose className='ai-close' onClick={() => navigate("/shorts")} />
          </div>

          <form onSubmit={formik.handleSubmit}>
            <div className='form-input-head'>
              <div className="form-input-field">
                <label htmlFor="date"> Title <span style={{
                  color: 'red'
                }}>*</span> </label> <br />
                <input type="text" name="title" id="title" placeholder='tilte'
                  onChange={formik.handleChange}
                  value={formik.values.title}
                  className='input-field'
                // onBlur={formik.handleBlur} 

                />

                {/* { formik.errors.password && formik.touched.password &&  <span className="error" style={{ color: "red" }}>
            {formik.errors.password}
          </span>} */}
              </div>
              <div className="form-input-field">
                <label htmlFor="date"> Sub Title <span style={{
                  color: 'red'
                }}>*</span> </label> <br />
                <input type="text" name='sub_title' placeholder='Sub_title'
                  onChange={formik.handleChange}
                  value={formik.values.sub_title}
                  //  onBlur={formik.handleBlur}
                  className='input-field' />
                {/* { formik.errors.password && formik.touched.password &&  <span className="error" style={{ color: "red" }}>
            {formik.errors.password}
          </span>} */}
              </div>

              <div className="form-input-field">
                <label htmlFor=""> Video Link <span style={{ color: 'red' }}>*</span> </label> <br />
                <input type="file"
                  id="docs"
                  name='docs'
                  accept="video/*"
        
                  onChange={(e) => {
                    formik.setFieldValue('docs', e?.currentTarget?.files[0]);
                    console.log(e?.currentTarget?.files[0])
                  }}
                  className='input-field' />

                {/* { formik.errors.password && formik.touched.password &&  <span className="error" style={{ color: "red" }}>
            {formik.errors.password}
          </span>} */}
              </div>
            </div>
            <div className='submit-btn' >
              <button type='submit' >Submit</button>
            </div>

            {/* { formik.errors.managerPassword && formik.touched.managerPassword &&  <span className="error" style={{ color: "red",marginLeft:"1rem" }}>
              {formik.errors.managerPassword}
            </span>}
           */}
          </form>
        </div>
      </div>
    </div>)
}

export default AddShorts
