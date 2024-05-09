import React, { useEffect, useState } from 'react'
import "../shorts/shorts.css"
import Pagination from '../../component/pagination/Pagination'
import { MdEdit } from 'react-icons/md'
import { MdDelete } from 'react-icons/md'
import { deleteCaller, getCaller, postCaller, updateCaller } from '../../services/api'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { AiOutlineClose } from 'react-icons/ai'
import { IoSearchOutline } from 'react-icons/io5'
import { icon, toastData } from '../Toast'
const success = Swal.mixin(toastData.success)



const Shorts = () => {
    const navigate = useNavigate()
    const [short, setShort] = useState([])
    const [pageLimit, setPageLimit] = useState(10);
    const [offset, setOffset] = useState(0);

    const [inputValue, setInputValue] = useState("")
    const [itemsPerPage, setItemsPerPage] = useState(5);

    const getShort = async () => {
        const res = await getCaller(`admin/v1/get/all/reels?limit=${pageLimit}&offset=${offset}`)
        setShort(res?.data)
    }

    useEffect(() => {
        getShort()
    }, [pageLimit, offset]) 


    const deleteshorts = async (item) => {
        toastData.confirm.text = "You won't to Delete Reel"
        Swal.fire(toastData.confirm).then(async (result) => {
            const res = await postCaller(`admin/v1/delete/reel?reel_id=${item}`)
            if (result.isConfirmed) {
                if (res?.status === true) {
                    icon.confirm.text = "Reel Deleted Successfully"
                    Swal.fire(icon.confirm)
                    getShort()
                }

            }
        })

    }

    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(short?.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = short?.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const handleItemsPerPageChange = (e) => {
        const newItemsPerPage = parseInt(e.target.value, 10);
        setItemsPerPage(newItemsPerPage);
        setCurrentPage(1); // Reset to the first page when changing items per page
    };
    const currentShorts = currentData?.filter((el) => el?.title?.toLowerCase().indexOf(inputValue?.toLowerCase()) !== -1);
    return (
        <>
         
            <div className="main-table-header">
             <div className="main-table-content">
             <div className="wrapper-head">
                    <h3>Shorts List</h3>
                    <div className='search-short-section'>
                    <div className="head-btn">
                        <button onClick={(() => navigate('/shorts/AddShorts'))}>Add Shorts</button>
                    </div>

                    <div className='searchcard'>
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
            <div className="scroll-table">
            <div className="table-header">
             <table style={{overflowX:"auto",whiteSpace:"nowrap"}}>
                            <thead>
                                <tr className='custom-row'>
                                    <th width={80}> Title </th>
                                    <th width={400}> Sub Title</th>
                                    <th width={220}> Comment</th>
                                    <th width={150}>Like</th>
                                    <th width={150}>Comment</th>
                                    <th width={100}> Videos</th>
                                    <th width={100}> Action</th>
                                </tr>
                           </thead>
                           <tbody>
                                {
                                    currentShorts?.length > 0 ? currentShorts?.map((el, i) => (
                                        <tr className='custom-row' key={i}>
                                            <td width={80} data-label="UID"> <p className='uid_name' >{el?.title} </p> </td>
                                            <td width={400} data-label="SPORT"> {el?.sub_title?.substring(0, 30)}</td>
                                            <td width={250} >

                                                <button className='show-btn'
                                                    onClick={() => navigate(`/shorts/comments/${el?.reel_id}`)}
                                                >View Comment</button>
                                            </td>

                                            <td width={150} > {el?.likeCount ?? "0"}</td>
                                            <td width={150} > {el?.commentCount ?? "0"}</td>

                                            <td data-label="MARKET" width={100}>
                                                <Link className='show-btn' to={el?.url}>open</Link>

                                            </td>
                                            <td data-label="STATUS" height={70} width={100}>

                                                <div className='user-icon' >
                                                    <div className="icon-action" onClick={(() => navigate('/shorts/AddShorts', {
                                                        state: {
                                                            singleShorts: el
                                                        }
                                                    }))}>
                                                        <MdEdit className='mdDelete' />
                                                        <span class="tooltiptext">Update Reel</span>

                                                    </div>
                                                    <div className="icon-action" style={{ backgroundColor: "#F44464" }} onClick={() => deleteshorts(el.reel_id)}>
                                                        <MdDelete className='mdDelete' />
                                                        <span className="tooltiptext">Delete Reel</span>

                                                    </div>
                                                </div>
                                            </td>
                                        </tr>)) : <tr className=''><td className='no-data-coloumn' align='center' colSpan={10}>No Data</td></tr>
                                }
                                </tbody>
                        </table>
                </div>
            </div>
               <div className="pagination-container">
               {
                short?.length>0 ? <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                handleItemsPerPageChange={handleItemsPerPageChange}
                itemsPerPage={itemsPerPage}
            />:null
               }
               </div>
            </div>
        </>
    )
}

export default Shorts