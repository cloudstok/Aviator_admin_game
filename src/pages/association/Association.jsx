import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { deleteCaller, getCaller, postCaller, updateCaller } from '../../services/api'
import { MdAdd, MdDelete } from 'react-icons/md'
import Swal from "sweetalert2";
import { icon, toastData } from '../Toast'
import "../association/association.css"
import { AiOutlineClose } from 'react-icons/ai'
import { IoSearchOutline } from 'react-icons/io5'
import Pagination from '../../component/pagination/Pagination';
const success = Swal.mixin(toastData.success)



const Association = () => {
    const navigate = useNavigate()
    const [associationData, setAssociationData] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [searchInput, setSearchInput] = useState("");
    const [itemsPerPage, setItemsPerPage] = useState(5);

    const [inputValue, setInputValue] = useState("")
    const getAssociationList = async () => {
        const res = await getCaller(`admin/v1/association/list`)
        setAssociationData(res)
    }

    useEffect(() => {
        getAssociationList()
    }, [])
    const addTournament = async (item) => {
        const res = await postCaller(`admin/v1/add/tournaments?ass_key=${item.ass_key}`)
        if (res?.status === true) {
            //    alert(res.msg)
            await success.fire(Object.assign(icon.success, { title: "Tournament Add Successfully" }))
        }
    }
    const handleDelete = async (item) => {
        const res = await updateCaller(`admin/v1/delete/association?ass_key=${item.ass_key}`)
        if (res.status === true) {
            alert("Association Deleted Successful")
            getAssociationList()
        }
    }
    const totalPages = Math.ceil(associationData?.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = associationData?.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const handleItemsPerPageChange = (e) => {
        const newItemsPerPage = parseInt(e.target.value, 10);
        setItemsPerPage(newItemsPerPage);
        setCurrentPage(1); // Reset to the first page when changing items per page
    };
    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
        //   console.log(e.target.value)
    };
    const completeData = currentData?.filter((el) => el?.name?.toLowerCase().indexOf(inputValue?.toLowerCase()) !== -1);
    return (

        <div className="main-table-header">
            <div className="main-table-content">
                <div className="wrapper-head">
                    <h3>Association List</h3>
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
            <div className="scroll-table">
                <div className="table-header">
                    <table style={{overflowX:"auto",whiteSpace:"nowrap"}}>
                        <thead>
                            <tr className='custom-row'>
                                <th width={600}> Name </th>
                                <th width={400}>Action</th>
                            </tr>

                        </thead>
                        <tbody>

                            {
                                completeData?.length > 0 ? completeData?.map((el, i) => (
                                    <tr height={70} className='custom-row' key={i}>
                                        <td width={500} >
                                            {el?.name}
                                        </td>

                                        <td data-label="STATUS" width={350}>
                                            <Link onClick={() => addTournament(el)} className='show-btn'>
                                                Add Tournament
                                            </Link>

                                        </td>
                                    </tr>
                                )) : <tr><td className='no-data-coloumn' align='center' colSpan={10}>No Data</td></tr>

                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="pagination-container">
                {
                    associationData?.length > 0 ?
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            handleItemsPerPageChange={handleItemsPerPageChange}
                            itemsPerPage={itemsPerPage}
                            onPageChange={handlePageChange}
                        /> : null
                }
            </div>
        </div>
    )
}

export default Association