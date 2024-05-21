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



// module.exports = data


// import React, { useEffect, useState } from 'react'
// import { MdEdit } from 'react-icons/md'
// import { MdDelete } from 'react-icons/md'
// import { EmpData } from '../../EmpData'
// import { AiOutlineClose } from 'react-icons/ai'
// import { IoSearchOutline } from 'react-icons/io5'
// import { useNavigate } from 'react-router-dom'

// const BetAmount = () => {
//   const navigate = useNavigate()
//   const [data, setData] = useState([])
//   const [inputValue, setInputValue] = useState("")

//   const handleEdit = (id) => {
//     const dt = data.filter(item => item.id === id);
//     if (dt !== undefined) {

//     }
//   }

//   const handleDelete = (id) => {
//     if (id > 0) {
//       if (window.confirm("Are Your Sure To Delete ?")) {
//         const dt = data.filter(item => item.id !== id);
//         setData(dt);
//       }
//     }
//   }

//   useEffect(() => {
//     setData(EmpData)
//   }, []);
//   return (
//     <div className="main-table-header">
//       <div className="main-table-content">
//         <div className="wrapper-head">
//           <h3>Amount List</h3>
//           <div className='search-news-section'>
//             <div className="head-btn">
//               <button onClick={(() => navigate('/betAmount/addAmount'))}>Add Amount</button>
//             </div>
//             {/* <div className='searchcard' >
//               <input type="text" name="" id="" placeholder='Search' className='result-input'
//                 onChange={event => { setInputValue(event.target.value); }}
//                 value={inputValue}
//               />
//               {inputValue ? <div className="ai-close">
//                 <AiOutlineClose onClick={(event) => setInputValue('')}
//                 />
//               </div> : <div className='ai-close'> <IoSearchOutline /></div>
//               }
//             </div> */}
//           </div>

//         </div>
//       </div>
//       <div className="table-header">
//         <table style={{ overflowX: "auto", whiteSpace: "nowrap", border: ".5rem" }}>
//           <thead>
//             <tr className='custom-row'>
//               <th> Id </th>
//               <th>cash 1</th>
//               <th> cash 2</th>
//               <th>cash 3</th>
//               <th>cash 4</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>

//             {
//               data.map((item, index) => {
//                 return (

//                   <tr className='custom-row' style={{ backgroundColor: "white" }} key={index}>
//                     <td data-label="UID"> <p className='uid_name' > {item?.id} </p> </td>
//                     <td data-label="SPORT">{item?.case1}</td>
//                     <td data-label="MARKET" height={70} > {item.case2} </td>
//                     <td data-label="MARKET" height={70} > {item.case3} </td>
//                     <td data-label="MARKET" height={70} > {item.case4}</td>

//                     <td data-label="STATUS">
//                       <div className='user-icon' width={100}>
//                         <div className="icon-action" onClick={() => handleEdit(item.id)} >
//                           <MdEdit className='mdDelete' />

//                         </div>
//                         <div className="icon-action" style={{ backgroundColor: "#F44464" }} onClick={() => handleDelete(item.id)}>
//                           <MdDelete className='mdDelete' />

//                         </div>
//                       </div>
//                     </td>
//                   </tr>
//                 )
//               })
//             }



//           </tbody>
//         </table>
//       </div>
//     </div>
//   )
// }

// export default BetAmount