import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import Pagination from '../../component/pagination/Pagination'

const Teams = () => {
    const navigate = useNavigate()
  return (
    <>
        <div className="wrapper">
                <div className="wrapper-head">
                    <h3>Team List</h3>
                    <div className="add-btn">
                        <button onClick={(()=>navigate('/teams/AddTeams'))}>Add Teams</button>
                    </div> 
                </div>
                <div className="table-border">
                    <table>
                        <thead>
                            <tr className='custom-row'>
                                <th> Id </th>
                                <th> Name </th>
                                <th> Cover Image</th>
                                <th> Action</th>
                            </tr>
                        </thead>

                        {/* <tbody>

                            {
                                news?.length > 0 ? news?.map((el, i) => (
                                        <tr className='custom-row' key={i}>
                                            <td data-label="UID"> <p className='uid_name' >{el?.news_id} </p> </td>
                                            <td data-label="SPORT"> {el?.heading?.substring(0,50)}</td>
                                            <td data-label="EVENT NAME"> {el?.content?.substring(0,50)}</td>
                                            <td data-label="MARKET">
                                                <div className="news-image">
                                                    <img src={el?.cover_image} alt="" />
                                                </div>
                                            </td>
                                            <td data-label="STATUS">
                                                

                                                <div className='user-icon' >
                                           <div className="icon-action" onClick={(()=>navigate('/news/AddNews',{
                                                        state:{
                                                            singleNews:el
                                                        }
                                                    }))} >
                                           <MdEdit style={{color:"white",fontSize:"1.5rem"}} />
                                           </div>
                                       <div className="icon-action" style={{backgroundColor:"#F44464"}} onClick={()=>deleteNews(el.news_id)}>
                                       <MdDelete style={{color:"white",fontSize:"2rem"}} />
                                       </div>
                                            </div>
                                            </td>
                                        </tr>
                                    )) : <tr className=''><td className='no-data-coloumn' align='center' colSpan={10}>No Data</td></tr>
                            }
                        </tbody> */}
                    </table>
                </div>
                <Pagination/>
            </div>
    </>
  )
}

export default Teams