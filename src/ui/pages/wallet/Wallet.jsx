import React, { useEffect, useState } from 'react';
import { getCaller, updateCaller } from '../../../services/api';
import { MdDelete, MdEdit } from 'react-icons/md';
import { icon, toastData } from '../../components/toast/Toast';
import Swal from 'sweetalert2';
import AddButton from '../../components/button/AddButton';
import WalletEdit from './WalletEdit';
import PaginationComponent from '../../components/pagination/PaginationComponent';

const Wallet = () => {
  const [dataWallet, setDataWallet] = useState([]);
  const [wallet, setWallet] = useState(false);
  const [updateWallet, setUpdateWallet] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const walletData = async () => {
    const res = await getCaller(`admin/users/wallet?page=${currentPage}&size=${pageSize}`);
    setDataWallet(res?.data || []);
  };

  const deleteWallet = async (user_id) => {
    toastData.confirm.text = 'Do you want to delete this User?';
    Swal.fire(toastData.confirm).then(async (result) => {
      if (result.isConfirmed) {
        const res1 = await updateCaller(`admin/users/wallet?user_id=${user_id}`, { is_deleted: 0 });
        if (res1?.status === true) {
          icon.confirm.text = 'User Deleted Successfully';
          Swal.fire(icon.confirm);
          walletData();
        } else {
          icon.error.text = 'Failed to delete User';
          Swal.fire(icon.error);
        }
      } else {
        console.log('User deletion cancelled');
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

  const handleReset = (item) => {
    setUpdateWallet(item);
    setWallet(true);
  };

  useEffect(() => {
    walletData();
  }, []);

  return (
    <div className="bet-container">
      <div className="data-table-container">
        <div className="data-header-container">
          <div className="search-table-container">
            <h1 className="search-h1">Wallet List</h1>
            {/* Uncomment if needed */}
            {/* <div className="search-container">
              <input type="text" placeholder="Search..." />
              <AddButton name="Add Wallet" handleOpenModal={() => setShowModal(true)} />
            </div> */}
          </div>
          <div className="table-container2">
            <table>
              <thead>
                <tr>
                  <th>User ID</th>
                  <th>Created By</th>
                  <th>Amount</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {dataWallet.length > 0 ? (
                  dataWallet.map((el, i) => (
                    <tr key={i}>
                      <td>{el?.user_id}</td>
                      <td>{el?.created_by}</td>
                      <td>{el?.amount}</td>
                      <td>
                        <div className="action-section">
                          <AddButton name={<MdEdit />} handleOpenModal={() => handleReset(el)} />
                          <button type="button" style={{ color: 'red' }} onClick={() => deleteWallet(el?.user_id)}>
                            <MdDelete />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="no-data-column" align="center" colSpan={4}>
                      No Data
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            {wallet && <WalletEdit wallet={wallet} setWallet={setWallet} updateWallet={updateWallet} walletData={walletData} />}
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

export default Wallet;
