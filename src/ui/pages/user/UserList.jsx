import React, { useEffect, useState } from 'react';
import { getCaller, postCaller, updateCaller } from '../../../services/api';
import AddButton from '../../components/button/AddButton';
import AddUser from './AddUser';
import { MdDelete, MdEdit } from 'react-icons/md';
import { IoIosSearch } from 'react-icons/io';
import { AiOutlineClose } from 'react-icons/ai';
import { icon, toastData } from '../../components/toast/Toast';
import Swal from 'sweetalert2';
import WalletButton from '../../components/button/WalletButton';
import PaginationComponent from '../../components/pagination/PaginationComponent';

const success = Swal.mixin(toastData.success);
const warn = Swal.mixin(toastData.error);

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [edit, setEdit] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [inputValue, setInputValue] = useState('');
  const [category, setCategory] = useState('');

  const fetchData = async () => {
    const res = await getCaller(`admin/users?page=${currentPage}&size=${pageSize}`);
    if (res?.data) {
      setUsers(res.data);
      setFilteredUsers(res.data);
      setTotal(res.total); // Ensure you set total for pagination
    }
  };

  const deleteUser = async (userId) => {
    toastData.confirm.text = "Do you want to delete this User?";
    Swal.fire(toastData.confirm).then(async (result) => {
      if (result.isConfirmed) {
        const res1 = await updateCaller(`admin/users?user_id=${userId}`, { is_deleted: 0 });
        if (res1?.status === true) {
          icon.confirm.text = "User Deleted Successfully";
          Swal.fire(icon.confirm);
          fetchData();
        } else {
          icon.error.text = "Failed to delete User";
          Swal.fire(icon.error);
        }
      }
    });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (e) => {
    const newItemsPerPage = parseInt(e.target.value, 10);
    setPageSize(newItemsPerPage);
    setCurrentPage(1);
  };

  const handleAdd = () => {
    setEdit(false);
    setEditData(null);
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setEdit(true);
    setEditData(item);
    setShowModal(true);
  };

  const walletData = async (userId) => {
    try {
      const res = await postCaller(`admin/users/wallet`, { user_id: userId });
      if (res?.status === true) {
        success.fire(Object.assign({}, icon.success, { title: "Wallet Added successfully" }));
      } else {
        warn.fire(Object.assign({}, icon.error, { title: "Failed to add wallet" }));
      }
    } catch (error) {
      console.error("Error fetching wallet data:", error);
      warn.fire(Object.assign({}, icon.error, { msg: "Failed to fetch wallet data" }));
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, pageSize]);

  useEffect(() => {
    const filteredData = users.filter(user =>
      (user.name.toLowerCase().includes(inputValue.toLowerCase()) ||
        user.email.toLowerCase().includes(inputValue.toLowerCase()) ||
        user.phone.toLowerCase().includes(inputValue.toLowerCase())) &&
      (!category || user.category === category)
    );
    setFilteredUsers(filteredData);
  }, [inputValue, category, users]);

  return (
    <div className='bet-container'>
      <div className="data-table-container">
        <div className="data-header-container">
          <div className="search-table-container">
            <h1 className="search-h1">User List</h1>
            <div className=''>
              <div className="search-container">
                <div className="input-wrapper">
                  <input
                    type="text"
                    placeholder='Search'
                    className='result-input'
                    onChange={event => setInputValue(event.target.value)}
                    value={inputValue}
                  />
                  {inputValue ? (
                    <div className="ai-close" onClick={() => setInputValue('')}>
                      <AiOutlineClose />
                    </div>
                  ) : (
                    <div className="ai-search">
                      <IoIosSearch />
                    </div>
                  )}
                </div>
                <div className=''>
                  <AddButton name="Add User" handleOpenModal={() => handleAdd()} />
                </div>
              </div>

              <div className=''>
                <select
                  className='category-select'
                  onChange={e => setCategory(e.target.value)}
                  value={category}
                >
                  <option value="">All Categories</option>
                  <option value="name">Name</option>
                  <option value="email">Email</option>
                  <option value="phone">Phone</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="table-container2">
          <table>
            <thead>
              <tr>
                <th>User Id</th>
                <th>Name</th>
                <th>Image</th>
                <th>Currency</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Wallet</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? filteredUsers.map((el, i) => (
                <tr key={i}>
                  <td>{el.user_id}</td>
                  <td>{el.name}</td>
                  <td>
                    <img src={el.url} alt={el.name} style={{ width: '50px', height: '50px' }} />
                  </td>
                  <td>{el.currency}</td>
                  <td>{el.phone}</td>
                  <td>{el.email}</td>
                  <td>
                    <WalletButton name="Add Wallet" onClick={() => walletData(el.user_id)} />
                  </td>
                  <td>
                    <div className='action-section'>
                      <AddButton name={<MdEdit />} handleOpenModal={() => handleEdit(el)} />
                      <button
                        type='button'
                        style={{ color: 'red' }}
                        onClick={() => deleteUser(el.user_id)}
                      >
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
            <AddUser
              show={showModal}
              setShowModal={setShowModal}
              userData={fetchData}
              editData={editData}
              edit={edit}
            />
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
    </div >
  );
};

export default UserList;
