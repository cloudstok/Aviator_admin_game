import React, { useState } from 'react'
import TogglePage from '../../components/toggle/TogglePage'
import './operator.css'
import { MdDelete } from "react-icons/md";
import { MdEdit } from 'react-icons/md'
import Button from '../../components/button/Button';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../routes/Routes';
import AddButton from '../../components/button/AddButton';
import AddOperatorModal from './AddOperatorModel';

const Operator = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const [active, setActive] = useState(false)
  const [isEditButtonClicked, setIsEditButtonClicked] = useState(false);



  const unable = async () => {

    if (!active) {
      setActive(!(active))
      // success.fire(Object.assign(icon.success, { title: "success" }))
    } else {
      setActive(!(active))
      // success.fire(Object.assign(icon.success, { title: "success" }))
    }
  }
  return (
    <div className='bet-container'>
      <div className="data-table-container">
        <div className="data-header-container">

          <div className="search-table-container">
            <h1 className="search-h1"> Operator List</h1>
            <div className="search-container">
              <input type="text" placeholder="Search..." />

              <AddButton name="Add Operator" handleOpenModal={() => setShowModal(true)} />

            </div>

          </div>


          {/* /////// table ////////// */}
          <div>
            <div className='Add-container'>

            </div>
            <div class="table-container2">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Client ID</th>
                    <th>Client Secret Key</th>
                    <th>User List</th>
                    <th>Game List</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Clickbet</td>
                    <td>0123456</td>
                    <td>987654</td>

                    <td>
                      <Button name="View List" routes={() => navigate(ROUTES.USERLIST)} />
                    </td>
                    <td>
                      <Button name="Game List" routes={() => navigate(ROUTES.GAMELIST)} />
                    </td>

                    <td data-label="MARKET" height={70} onClick={unable} > <TogglePage /> </td>
                    <td>
                      <div className='action-section'>
                        <button
                          type='button'
                          style={{ color: isEditButtonClicked ? '#007bff' : 'red' }}
                        >
                          <MdEdit />
                        </button>
                        {/* <button type='button' onClick={handleDeleteClick}>
                          <MdDelete />
                        </button> */}
                      </div>
                    </td>

                  </tr>


                </tbody>
              </table>

              {showModal && (
                <AddOperatorModal show={showModal} setShowModal={setShowModal} />
              )}



              {/* <PaginationComponent
          currentPage={currentPage}
          itemsPerPage={pageSize}
          totalPages={totalPages1}
          onPageChange={handlePageChange}
          handleItemsPerPageChange={handleItemsPerPageChange}
        /> */}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Operator