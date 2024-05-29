import React, { useState } from 'react'
import AddButton from '../../components/button/AddButton'

const Wallet = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className='bet-container'>
    <div className="data-table-container">
      <div className="data-header-container">
        <div className="search-table-container">
          <h1 className="search-h1">Wallet List</h1>
          <div className="search-container">
            <input type="text" placeholder="Search..." />
            <AddButton name="Add Wallet" handleOpenModal={() => setShowModal(true)} />
          </div>
        </div>
        <div className="table-container2">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Admin ID</th>
                <th>Amount</th>
                <th>Currency</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
        
          </table> 
        
        </div>
      </div>
    </div>
  </div>
  )
}

export default Wallet
