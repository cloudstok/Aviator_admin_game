import React, { useEffect, useState } from 'react'
import "../user/user.css"
import img from '../../assets/person-dummy.jpg'
import ToggleButton from '../../component/toggleButton/ToggleButton'
import { IoSearchOutline } from 'react-icons/io5'
import { getCaller } from '../../services/api'
import { toastData } from '../Toast'
import { icon } from '../Toast'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import Pagination from '../../component/pagination/Pagination'
import { AiOutlineClose } from 'react-icons/ai'
const success = Swal.mixin(toastData.success)
const User = () => {
    const [userData, setUserData] = useState([])
    const navigate = useNavigate()
    const [active, setActive] = useState(false)
    const [inputValue, setInputValue] = useState("")

    const getUsers = async () => {
        const res = await getCaller(`admin/v1/get/userslist`)
        setUserData(res?.data)
    }
    useEffect(() => {
        getUsers()
    }, [])
    const itemsPerPage = 5
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(userData?.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = userData?.slice(startIndex, endIndex);
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const unable = async () => {

        if (!active) {
            setActive(!(active))
            success.fire(Object.assign(icon.success, { title: "success" }))
        } else {
            setActive(!(active))
            success.fire(Object.assign(icon.success, { title: "success" }))
        }
    }

    // const deleteUser = async (id) => {
    //     const res = await deleteCaller(`admin/v1/deleteuser/${id}`)
    //     success.fire(Object.assign(icon.success, { tittle: res.message }))

    //     if (res.data) {
    //         getUsers()
    //     }
    // }

    const currentUser = currentData?.filter((el) => el?.name?.toLowerCase().indexOf(inputValue?.toLowerCase()) !== -1);


    return (
        <>
            <div className="main-table-header">
             <div className="main-table-content">
             <div className="wrapper-head">
                    <h3>User List</h3>
                    <div className='search-news-section'>
                        <div className='searchcard' >
                            <input type="text" name="" id="" placeholder='Search' className='result-input'
                                onChange={event => { setInputValue(event.target.value); }}
                                value={inputValue}
                            />
                            {inputValue ? <div className="ai-close">
                                <AiOutlineClose onClick={(event) => setInputValue('')}
                                />
                            </div> : <div className='ai-close'> <IoSearchOutline /></div>
                            }
                        </div>
                    </div>

                </div>
             </div>
             </div>
             <div className="table-header">
                    <table style={{overflowX:"auto",whiteSpace:"nowrap"}}>
                        <thead>
                            <tr className='custom-row'>
                                <th> UID </th>
                                <th> Name </th>
                                <th> Enable</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                currentUser?.length > 0 ? currentUser?.map((el, l) => (
                                    <tr className='custom-row' style={{ backgroundColor: "white" }}>
                                        <td data-label="UID"> <p className='uid_name' > {el?.u_id} </p> </td>
                                        <td data-label="SPORT">
                                            <div className="user-flex-1">
                                            {
                                                el?.image ?  <img src={el?.image} alt=""/> : <img src={img} alt=''/>
                                            }
                                          
                                                <p className="" >
                                                    {el.name} </p>
                                            </div>
                                        </td>
                                        <td data-label="MARKET" height={70} onClick={unable} > <ToggleButton /> </td>

                                    </tr>
                                )) : <tr className=''><td className='no-data-coloumn' align='center' colSpan={10}>No Data</td></tr>
                            }
                        </tbody>
                    </table>
                </div>
               <div className="pagination-container">
               {
                    userData?.length > 0 ? <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    /> : null
                }
               </div>
        </>
    )
}

export default User