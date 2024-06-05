import React, { useEffect, useState } from 'react';
import TogglePage from '../../components/toggle/TogglePage';
import './admin.css';
import { MdDelete, MdEdit, MdVisibility, MdVisibilityOff } from 'react-icons/md';
import Button from '../../components/button/Button';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../routes/Routes';
import AddButton from '../../components/button/AddButton';
import AddOperatorModal from './AddAdmin';
import { deleteCaller, getCaller, updateCaller } from '../../../services/api';
import { icon, toastData } from '../../components/toast/Toast';
import Swal from 'sweetalert2';
import PaginationComponent from '../../components/pagination/PaginationComponent';
import ResetPassword from './ResetPassword';

const success = Swal.mixin(toastData.success);
const warn = Swal.mixin(toastData.warn);

const Admin = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState(false)
  const [operatorData, setOperatorData] = useState([]);
  const [isEditButtonClicked] = useState(false);
  const [visibleRow, setVisibleRow] = useState(null);
  const [userId, setUserId] = useState("")
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const operatorTable = async () => {
    const res = await getCaller(`superAdmin/admin?page=${currentPage}&size=${pageSize}`);
    setOperatorData(res?.data);
    setTotal(res?.data?.total);
  };

  const toggleSecretVisibility = (index) => {
    setVisibleRow(visibleRow === index ? null : index);
  };

  const unable = async (el) => {
    const { user_id, is_active } = el;
    const res = await updateCaller(`superAdmin/admin`, { user_id, is_active: !is_active });
    await operatorTable();
    if (res?.status) {
      if (is_active) {
        success.fire(Object.assign(icon.success, { title: "Operator Activated" }));
      } else {
        warn.fire(Object.assign(icon.success, { title: "Operator Deactivated" }));
      }
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (e) => {
    const newItemsPerPage = parseInt(e.target.value, 10);
    setPageSize(newItemsPerPage);
    setCurrentPage(1);
  };

  const deleteAdmin = async (user_id) => {
    toastData.confirm.text = "Do you want to delete this Admin?";
    Swal.fire(toastData.confirm).then(async (result) => {
      if (result.isConfirmed) {
        const res1 = await deleteCaller(`superAdmin/admin?user_id=${user_id}`);
        if (res1?.status === true) {
          icon.confirm.text = "Admin Deleted Successfull";
          Swal.fire(icon.confirm);
          operatorTable();
        } else {
          icon.error.text = "Failed to delete Admin";
          Swal.fire(icon.error);
        }
      } else {
        console.log("Admin deletion cancelled");
      }
    });
  };



  useEffect(() => {
    operatorTable();
  }, [currentPage, pageSize]);

  const handleReset = (item) => {
    setUserId(item)
    setPassword(true)
  }

  return (
    <div className='bet-container'>
      <div className="data-table-container">
        <div className="data-header-container">
          <div className="search-table-container">
            <h1 className="search-h1">Admin List</h1>
            <div className="search-container">
              <input type="text" placeholder="Search..." />
              <AddButton name="Add Admin" handleOpenModal={() => setShowModal(true)} />
            </div>
          </div>
          <div className="table-container2">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Admin ID</th>
                  <th>Secret Key</th>
                  <th>Reset Password</th>
                  <th>Currency</th>
                  <th>User List</th>
                  <th>Game List</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
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
                        <button type='button' style={{ color: isEditButtonClicked ? '#007bff' : 'blue' }}>
                          <MdEdit />
                        </button>
                        <button type='button' style={{ color: isEditButtonClicked ? '#007bff' : 'Red' }} onClick={() => deleteAdmin(el?.user_id)}>
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
              </tbody>
            </table>

            {showModal && (
              <AddOperatorModal show={showModal} setShowModal={setShowModal} operatorTable={operatorTable} />
            )}
            {password && (
              <ResetPassword password={password} setPassword={setPassword} userId={userId} />
            )}
            <PaginationComponent
              currentPage={currentPage}
              itemsPerPage={pageSize}
              totalPages={Math.ceil(total / pageSize)}
              onPageChange={handlePageChange}
              handleItemsPerPageChange={handleItemsPerPageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
