import React from 'react'
import Button from '../../components/button/Button'
import './admin.css'

const UserList = () => {
    return (

        <div className='bet-container'>
            <div className="data-table-container">
                <div className='userList'>
                    <div className=''>
                        <h3>User List</h3>
                    </div>
                    <div className='Add-container'>
                        <Button name="Add User" />
                    </div>
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
                                <td>123</td>
                                <td>123</td>
                                <td>123</td>
                                <td>123</td>
                                <td>123</td>
                                <td>123</td>
                                <td>123</td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>

        </div>

    )
}

export default UserList
