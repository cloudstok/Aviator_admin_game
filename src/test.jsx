// import betimg2 from '../src/frontend/assets/planebet.svg'
// import betimg1 from '../src/frontend/assets/betcash.svg'
// import betimg3 from '../src/frontend/assets/betcash2.svg'

export default {
    header_modal_head_h2 : "PROVABLY FAIR SETTINGS",
    header_modal_head_link : '`https://www.youtube.com/embed/PZejs3XDCSY?playsinline=1`',
    head_h1: "01",
    head_h1_img: "betimg1",
    prob_common_para: 'Make a bet, or even two at same time and wait for the round to start.',

    head_h2: "02",
    head_h2_img: "betimg2",
    prob_common_para2: 'Look after the lucky plane. Your win is bet multiplied by a coefficient of lucky plane.',

    head_h3: "03",
    head_h3_img: "betimg3",
    prob_common_para3: 'Cash Out before plane flies away and money is yours!'

}   


// import React, { useEffect, useState } from 'react'
// import { getCaller } from '../../../services/api';
// import Button from '../../components/button/Button'

// const Profile = ({ show, setOpenIcon }) => {
//     const[profileData, setProfileData] = useState({})

//     const profData = async () => {
//         const res = await getCaller(`self/operator`)
//         setProfileData(res.data)
//     }

//     const [formData, setFormData] = useState({
//         name: profileData?.name ? profileData?.name : "",
//         user_id: profileData?.user_id ? profileData?.user_id : "",
//         image: profileData?.image ? profileData?.image : "",
//         role: profileData?.role ? profileData?.role : "",
     
//     });

// console.log(formData.name)

// useEffect(()=> {
//     profData()
// },[])

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value,
//         });
//     };

//     const handleImageChange = (e) => {
//         setFormData({
//             ...formData,
//             image: URL.createObjectURL(e.target.files[0]),
//         });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         // Handle form submission logic
//         console.log(formData);
//     };
//     return (
//         <div>
//             <div className={`modal ${show ? 'show' : ''}`}>
//                 <div className="modal-content">
//                     <span className="close" onClick={() => setOpenIcon(false)}>&times;</span>
//                     <div className="data-table-container">
//                         <div className='Add-container'>
//                             <h3>My Profile</h3>
//                             <Button name="Add User" />
//                         </div>

//                         <form onSubmit={handleSubmit} className="form-container">
//                             <div>
//                                 <label>Name:</label>
//                                 <input
//                                     type="text"
//                                     name="name"
//                                     value={profileData.name}
//                                     onChange={handleChange}
//                                 />
//                             </div>
//                             <div>
//                                 <label>User Id:</label>
//                                 <input
//                                     type="text"
//                                     name="lastName"
//                                     value={formData.user_id}
//                                     onChange={handleChange}
//                                 />
//                             </div>
//                             <div>
//                                 <label>Image:</label>
//                                 <input
//                                     type="file"
//                                     name="image"
//                                     accept="image/*"
//                                     onChange={handleImageChange}
//                                 />
//                                 {formData.image && (
//                                     <div>
//                                         <img
//                                             src={formData.image}
//                                             alt="Selected"
//                                             style={{ width: '100px', height: '100px' }}
//                                         />
//                                     </div>
//                                 )}
//                             </div>
//                             <div>
//                                 <label>Role:</label>
//                                 <input
//                                     type="text"
//                                     name="role"
//                                     value={formData.role}
//                                     onChange={handleChange}
//                                 />
//                             </div>
                           

//                             <div className='form-submit-btn'>
//                                 <button type="submit">Submit</button>
//                             </div>
//                         </form>




//                     </div>
//                 </div>


//             </div>
//         </div>

//     )
// }

// export default Profile
