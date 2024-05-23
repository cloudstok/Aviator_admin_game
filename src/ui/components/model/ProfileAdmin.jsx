// import React, { useState } from 'react';
// import Button from '../button/Button';
// import './model.css'

// const ProfileAdmin = ({ show, setOpenIcon }) => {
//     return (


//         <div className={`modal ${show ? 'show' : ''}`}>
//             <div className="modal-content">
//                 <span className="close" onClick={()=>setOpenIcon(false)}>&times;</span>
//                 <div className=''>
//                     <h3>User List</h3>
//                 </div>
//                 <div className='bet-container'>
//                     <div className="data-table-container">
//                         <div className='Add-container'>
//                             <Button name="Add User" />
//                         </div>
//                         <div class="table-container2">
//                             <table>
//                                 <thead>
//                                     <tr>
//                                         <th>Name</th>
//                                         <th>Client ID</th>
//                                         <th>Client Secret Key</th>
//                                         <th>User List</th>
//                                         <th>Game List</th>
//                                         <th>Status</th>
//                                         <th>Action</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>

//                                 </tbody>
//                             </table>
//                             {/* <PaginationComponent
//           currentPage={currentPage}
//           itemsPerPage={pageSize}
//           totalPages={totalPages1}
//           onPageChange={handlePageChange}
//           handleItemsPerPageChange={handleItemsPerPageChange}
//         /> */}
//                         </div>
//                     </div>

//                 </div>
//             </div>
//         </div>


//     );
// };

// export default ProfileAdmin;