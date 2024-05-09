import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import { toastData } from '../Toast'
import { icon } from '../Toast'
import * as Yup from 'yup';
import { postCaller, updateCaller } from '../../services/api.js'
import { AiOutlineClose } from 'react-icons/ai'
import Swal from 'sweetalert2';
const success = Swal.mixin(toastData.success)
const error = Swal.mixin(toastData.error)

const toastSign = async () => {
  await success.fire(Object.assign(icon.success, { title: "news Add successfully" }))

}

const AddUpdateComments = () => {
  const navigate = useNavigate()
  const { state } = useLocation();
  const {reel_id} = useParams()
  const getSingleComments = state?.commetId ?? {}
  const isAddMode = !getSingleComments.comment_id
console.log(isAddMode)

  useEffect(() => {
    const getUpdatedData = async () => {
      const res = await getSingleComments
      formik.setValues(values => ({
        ...values,
        comment:res.comment
      }))
    }
    getUpdatedData()
  }, [])

  const formik = useFormik({
    initialValues: {
     comment:"",
    },
    // validationSchema: validationLogin,
    onSubmit: async (values,{resetForm}) => {
      
      if(isAddMode===false){
        const response = await postCaller(`admin/v1/update/comment?reel_id=${parseInt(reel_id)}&phone=7007083150&comment=${values.comment}&comment_id=${getSingleComments.comment_id}`)
        if (response.status === 'success') {
          success.fire(Object.assign(icon.success, { title: response.msg })).then((response)=>(
            navigate(`/shorts/comments/${reel_id}`)
        ))
         
      }
    }
    else{
      const response = await postCaller(`admin/v1/add/comment?reel_id=${parseInt(reel_id)}&phone=7007083150&comment=${values.comment}`)
      if (response.status === 'success') {
        success.fire(Object.assign(icon.success, { title: response.msg })).then((response)=>(
          navigate(`/shorts/comments/${reel_id}`)
        ))
    }
    
    }
    resetForm()
    }
})

  return (

    < div className="main-container">
      <div className="form-content">
        <div>
          <div className='form-heading'>
            <p>{isAddMode ? "Add Comments" : "Update Comments"}</p>
            <AiOutlineClose className='ai-close' onClick={() =>  navigate(`/shorts/comments/${reel_id}`)}/>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className='form-input-head'>
              <div className="form-input-field">
                <label htmlFor="date"> Comment <span style={{color: 'red'}}>*</span> </label> <br />
                <input type="text" name="comment" id="comment" placeholder='Add Comments...'
                  onChange={formik.handleChange}
                  value={formik.values.comment}
                  className='input-field'
                // onBlur={formik.handleBlur} 
                />

              </div>
            </div>
            <div className='submit-btn'>
              <button type='submit' >Submit</button>
            </div>

            {/* { formik.errors.managerPassword && formik.touched.managerPassword &&  <span className="error" style={{ color: "red",marginLeft:"1rem" }}>
              {formik.errors.managerPassword}
            </span>}
           */}
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddUpdateComments