import React, { useEffect, useState } from 'react'
import img from '../../assets/adminLogo.png'
import { getCaller, postCaller, updateCaller } from '../../services/api'
import { MdDelete, MdEdit } from 'react-icons/md'
import { MdOutlineArrowBack } from "react-icons/md";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { icon, toastData } from '../Toast';
import Swal from 'sweetalert2';
import Pagination from '../../component/pagination/Pagination';
const success = Swal.mixin(toastData.success)
const error = Swal.mixin(toastData.error)


const ShowComments = () => {
  const navigate = useNavigate()
  const { reel_id } = useParams()

  const [showComments, setShowComments] = useState([])

  const itemsPerPage = 5
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(showComments?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = showComments?.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getComments = async () => {
    const res = await getCaller(`admin/v1/get/comment?reel_id=${reel_id}`)
    setShowComments(res?.comments)
  }
  useEffect(() => {
    getComments()
  }, [])
  console.log(showComments)

  const deleteComment = async (item) => {
    success.fire(Object.assign(icon.success, { title: "Comment Delete Successfully" }))
    let data = {
      is_deleted: 0

    }

    const res = await postCaller(`admin/v1/delete/comment?comment_id=${item}`, data)
    getComments()
  }
  return (
    <>

      <div className="main-table-header">
        <div className="main-table-content">
          <div className="wrapper-head">
            <div className="arrow-back" onClick={() => navigate('/shorts')}>
              <MdOutlineArrowBack style={{ fontSize: "1.5rem" }} />
            </div>
            <div className="head-btn">
              <button onClick={() => navigate(`/shorts/addUpdateComments/${reel_id}`)}>Add Comments</button>
            </div>
          </div>
        </div>
        <div className="scroll-table">
          <div className="table-header">
            <table>
              <thead>
                <tr className='custom-row'>
                  <th> User </th>
                  <th>Comment</th>
                  <th> Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  currentData?.length > 0 ? currentData?.map((el, i) => (
                    <tr height={65} className='custom-row' key={i}>
                      <td data-label="UID">
                        <div className="show-flex-1">
                          {
                            el?.userImage ? <img src={el?.userImage} alt="" /> : <img src={img} alt='' />
                          }
                          <p className="">
                            {el.UserName} </p>
                        </div>
                      </td>
                      <td data-label="SPORT"> {el?.comment}</td>
                      <td data-label="SPORT" align='left'>
                        <div className='user-icon' >
                          <div className="icon-action"
                            onClick={() => navigate(`/shorts/addUpdateComments/${reel_id}`, {
                              state: {
                                commetId: el
                              }
                            })}
                          >
                            <MdEdit className='mdDelete' />
                            <span className="tooltiptext">Update Comments</span>

                          </div>
                          <div className="icon-action" style={{ backgroundColor: "#F44464" }} onClick={() => deleteComment(el?.comment_id)}>
                            <MdDelete className='mdDelete' />
                            <span className="tooltiptext">Delete Comments</span>

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
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </>
  )
}

export default ShowComments