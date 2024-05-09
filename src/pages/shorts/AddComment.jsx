import React, { useEffect, useState } from 'react'
import { getCaller, postCaller, updateCaller } from '../../services/api'
import { MdDelete } from 'react-icons/md'

import { useLocation, useNavigate } from 'react-router-dom';



const AddComment = () => {
  const navigate = useNavigate()
  const [comments, setComments] = useState()
  const [reel, setReel] = useState()
  const { state } = useLocation();
  let data = state?.data
  
  const getComments = () => {
    setComments(data.comments_data)
    setReel(data)
  }
  useEffect(() => {
    getComments()

  }, [])

  const deleteComment = async (item) => {
 
   let data = comments?.filter(e=>e?.like_id !==  item.like_id)

    const res = postCaller(`admin/v1/delete/comments?reel_id=${reel.reel_id}`, data)
 
   
    setComments(res.data)
  }

  return (
    <>
      <div className="wrapper">
      <button className='ButtonBack' onClick={()=> navigate(`/shorts`)}>Go Back</button>
        <div className="table-border">
          <table>
            <thead>
              <tr className='custom-row'>
                <th>
                  {/* <div className=''>
                    <input type="checkbox" />
                  </div> */}
                </th>
                <th> User </th>
                <th>Comment Id</th>
                <th>Comment</th>
                <th> Action</th>
              </tr>
            </thead>
            <tbody>
              {
                comments?.length > 0 ? comments?.map((el, i) => (
                  <tr height={65} className='custom-row'>
                    <td></td>
                    <td data-label="UID"> <p className="" > {el.user_id} </p> </td>
                    <td data-label="SPORT"> {el?.like_id}</td>
                    <td data-label="SPORT"> {el?.comment}</td>


                    <div className="icon-action" style={{ backgroundColor: "#F44464" , marginTop:"1rem" }} onClick={() => deleteComment(el)}>
                      <MdDelete className='mdDelete' />
                      <span className="tooltiptext">Delete Reel</span>

                    </div>


                  </tr>)) : <tr className=''><td className='no-data-coloumn' align='center' colSpan={10}>No Data</td></tr>

              }


            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default AddComment