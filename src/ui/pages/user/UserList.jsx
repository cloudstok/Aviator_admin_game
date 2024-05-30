import React, { useEffect, useState } from 'react'
import { getCaller } from '../../../services/api';
import AddButton from '../../components/button/AddButton'
import AddUser from './AddUser';
import { MdDelete, MdEdit } from 'react-icons/md';


const UserList = () => {
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState()
  const [isEditButtonClicked, setIsEditButtonClicked] = useState(false);

  const userData = async () => {
    const res = await getCaller(`admin/users`)
    setUser(res?.data)
  }

  useEffect(() => {
    userData()
  }, [])

  return (

    <div className='bet-container'>
      <div className="data-table-container">
        <div className="data-header-container">
          <div className="search-table-container">
            <h1 className="search-h1">User List</h1>
            <div className="search-container">
              <input type="text" placeholder="Search..." />
              <AddButton name="Add User" handleOpenModal={() => setShowModal(true)} />
            </div>
          </div>
          <div className="table-container2">
            <table>
              <thead>
                <tr>
                  <th>User Id</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {user?.length > 0 ? user?.map((el,i) => (
                <tr key={i}>
                  <td>{el?.user_id}</td>
                  <td>{el?.name}</td>
                  <td>{el?.email}</td>
                  <td>{el.phone}</td>
                  <td>
                      <div className='action-section'>
                        <button type='button' style={{ color: isEditButtonClicked ? '#007bff' : 'red' }}>
                          <MdEdit />
                        </button>
                        <button type='button'>
                          <MdDelete />
                        </button>
                      </div>
                    </td>
                </tr>
                ) ) : (
                  <tr>
                    <td className='no-data-column' align='center' colSpan={10}>No Data</td>
                  </tr>
                
                )}

              </tbody>

            </table>

            {showModal && (
              <AddUser show={showModal} setShowModal={setShowModal} userData={userData} />

            )}
          
            {/* <PaginationComponent
              currentPage={currentPage}
              itemsPerPage={pageSize}
              totalPages={Math.ceil(total / pageSize)}
              onPageChange={handlePageChange}
              handleItemsPerPageChange={handleItemsPerPageChange}
            /> */}
          </div>
        </div>
      </div>
    </div>

  )
}

export default UserList


{/* <AddOperatorModal show={showModal} setShowModal={setShowModal} operatorTable={operatorTable} /> */ }
