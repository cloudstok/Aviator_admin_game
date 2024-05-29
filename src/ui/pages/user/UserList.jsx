import React, { useState } from 'react'
import AddButton from '../../components/button/AddButton'
import AddUser from './AddUser';


const UserList = () => {
  const [showModal, setShowModal] = useState(false);

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
                  <th>Name</th>
                  <th>Currency</th>
                  <th>User List</th>
                  <th>Game List</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              {/* <tbody>
                {operatorData?.length > 0 ? operatorData?.map((el, i) => (
                  <tr key={i}>
                    <td>{el?.name}</td>
                    <td>{el?.user_id}</td>

                    <td>
                      {visibleRow === i ? el?.client_secret : '••••••••'}
                      <button onClick={() => toggleSecretVisibility(i)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                        {visibleRow === i ? <MdVisibilityOff /> : <MdVisibility />}
                      </button>
                    </td>


                    <td>
                      <AddButton name="Reset" handleOpenModal={() => handleReset(el?.user_id)} />
                    </td>

                    <td>{el?.currency}</td>
                    <td>
                      <Button name="View List" routes={() => navigate(ROUTES.USERLIST)} />
                    </td>
                    <td>
                      <Button name="Game List" routes={() => navigate(ROUTES.GAMELIST)} />
                    </td>
                    <td data-label="MARKET" height={70} onClick={() => unable(el)}>
                      <TogglePage defaultChecked={el?.is_active} />
                    </td>

                    <td>
                      <div className='action-section'>
                        <button type='button' style={{ color: isEditButtonClicked ? '#007bff' : 'red' }}>
                          <MdEdit />
                        </button>
                        <button type='button' onClick={() => deleteAdmin(el?.user_id)}>
                          <MdDelete />
                        </button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td className='no-data-column' align='center' colSpan={10}>No Data</td>
                  </tr>
                )}
              </tbody> */}
            </table>

            {showModal && (
              <AddUser show={showModal} setShowModal={setShowModal} />

            )}
            {/* {password && (
              <ResetPassword password={password} setPassword={setPassword} userId={userId} />
            )} */}
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
