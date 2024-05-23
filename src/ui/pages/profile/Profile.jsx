import React, { useState } from 'react'
import './profile.css'
import img from '../../../assets/avator.png'
import { useFormik } from 'formik';
import * as Yup from 'yup';
const Profile = () => {

    const [imageSrc, setImageSrc] = useState('path/to/initial/image.jpg');

    const formik = useFormik({
        initialValues: {
            name: "",
            role: "",
            user_id:"",
            number:"",

        },
        onSubmit:(values) => {
            console.log("form submit",values)
    
        }
    })

  


    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImageSrc(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (

        <div className='profile-container'>
            <div className='profile-section'>
                <div className='my-profile'>
                    <h3>My Profile</h3>
                    <h3>Edit</h3>
                </div>
                <div>
                    <form onSubmit={formik.handleSubmit}>
                        <div className='name-container'>
                            <div className='profile-img-section'>
                                <img src={img} alt="" />
                                <input type="file" accept="image/*" onChange={handleImageChange} />
                            </div>

                        </div>
                        <div className='form-container'>
                            <div className=''>
                                <label>
                                    Name:
                                    <input type="text"
                                        name="name"
                                        placeholder='Enter a Name'
                                        onChange={formik.handleChange}
                                        value={formik.values.name}
                                    />
                                </label>

                            </div>
                            <div className=''>
                                <label>
                                    Role:
                                    <input type="text"
                                        name="role"
                                        placeholder='Enter a Role'
                                        onChange={formik.handleChange}
                                        value={formik.values.role}
                                    />
                                </label>
                            </div>
                        </div>

                        <div className='form-container'>
                            <div className=''>
                                <label>
                                    User Id:
                                    <input type="text"
                                        name="user_id"
                                        placeholder='Enter a User Id'
                                        onChange={formik.handleChange}
                                        value={formik.values.user_id}
                                    />
                                </label>

                            </div>
                            <div className=''>
                                <label>
                                    Number:
                                    <input type="text"
                                        name="number"
                                        placeholder='Enter a Number'
                                        onChange={formik.handleChange}
                                        value={formik.values.number}
                                    />
                                </label>
                            </div>
                        </div>

                      

                        <div className='Button-container' style={{textAlign:"center"}}>
                            <button type='submit'>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default Profile
