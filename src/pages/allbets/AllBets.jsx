import React, { useState, useEffect } from 'react'
import { getCaller } from '../../services/api'
import { icon, toastData } from '../Toast'
import Swal from 'sweetalert2'
import '../../component/pagination/page.css'
import PaginationComponent from '../../component/pagination/PaginationComponent'

const success = Swal.mixin(toastData.success)

const AllBets = () => {
  const [userData, setUserData] = useState([])
  const [length, setLength] = useState();
  const [activeIndex, setActiveIndex] = useState(null);

  const getAllBet = async (offset) => {
    const res = await getCaller(`bet?limit=10&offset=${offset}`)
    setUserData(res?.data)
    setLength(res?.total)
  }

  const handleClick = (index) => {

    setActiveIndex(index)
    getAllBet(index * 10)

  };


  useEffect(() => {
    getAllBet(0)
  }, [])




  return (
    <>

      <div className="main-table-header">
        <div className="main-table-content">
          <div className="wrapper-head">
            <h3>All Bets</h3>
            <div className='search-news-section'>
              <div className="head-btn">
                <button>Add Bets</button>
              </div>
              {/* <div className='searchcard' >
              <input type="text" name="" id="" placeholder='Search' className='result-input'
                onChange={event => { setInputValue(event.target.value); }}
                value={inputValue}
              />
              {inputValue ? <div className="ai-close">
                <AiOutlineClose onClick={(event) => setInputValue('')}
                />
              </div> : <div className='ai-close'> <IoSearchOutline /></div>
              }
            </div> */}
            </div>

          </div>
        </div>
        <div className="table-header">
          <table style={{ overflowX: "auto", whiteSpace: "nowrap", border: ".5rem" }}>
            <thead>
              <tr className='custom-row'>
                <th> Bet Id </th>
                <th> Lobby Id </th>
                <th> User Id </th>
                <th> Bet Amount </th>
                <th> Balance </th>
                <th> Max Mult </th>
                <th> Status </th>
              </tr>
            </thead>
            <tbody>
              {
                userData?.length > 0 ? userData?.map((el, l) => (
                  <tr className='custom-row' style={{ backgroundColor: "white" }} >
                    <td data-label="UID"> <p className='uid_name' > {el?.bet_id} </p> </td>
                    <td data-label="SPORT">
                      {el?.lobby_id}
                    </td>
                    <td data-label="MARKET" height={70} > {el?.user_id} </td>
                    <td data-label="MARKET" height={70} > {el?.bet_amount} </td>
                    <td data-label="MARKET" height={70} > {el?.balance} </td>
                    <td data-label="MARKET" height={70} > {el?.max_mult} </td>

                    <td
                      data-label="MARKET"
                      style={{ color: el?.status === 'CRASHED' ? 'red' : 'green' }}
                      height={70} > {el?.status?.toUpperCase()} </td>


                  </tr>
                )) : <tr className=''><td className='no-data-coloumn' align='center' colSpan={10}>No Data</td></tr>
              }



            </tbody>

          </table>
          <div className="pagination-container">
            {
              length > 0 ? <PaginationComponent
                length={length}
                handleClick={handleClick}
                activeIndex={activeIndex}
              // totalPages={totalPages}
              // onPageChange={handlePageChange}
              // handleItemsPerPageChange={handleItemsPerPageChange}
              // itemsPerPage={itemsPerPage}
              /> : null
            }
          </div>
        </div>
      </div>

    </>
  )
}

export default AllBets