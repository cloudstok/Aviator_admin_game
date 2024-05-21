import React, { useState, useEffect } from 'react'
import { getCaller } from '../../../services/api'
import PaginationComponent from '../../components/pagination/PaginationComponent'

const AllBets = () => {
  const [userData, setUserData] = useState([]); 
  const [currentPage, setCurrentPage] = useState(1); 
  const [total, setTotal] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const getAllBet = async () => {
    try {
      const offset = (currentPage - 1) * pageSize;
      const res = await getCaller(`bet?limit=${pageSize}&offset=${offset}`);
      setUserData(res.data);
      setTotal(res.total);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handleItemsPerPageChange = (e) => {
    const newItemsPerPage = parseInt(e.target.value, 10);
    setPageSize(newItemsPerPage);
    setCurrentPage(1); // Reset to the first page when changing items per page
  };
  const totalPages1 = Math.ceil(total / pageSize);

  useEffect(() => {
    getAllBet();
  }, [currentPage, pageSize]);

  return (
    <>
     <div className="commissionContainer">
        <div className="TableContainer" style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
          <table>
            <thead>
              <tr>
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
                  <tr className='custom-row' style={{ backgroundColor: "white" }} key={l}>
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
          <PaginationComponent
            currentPage={currentPage}
            itemsPerPage={pageSize}
            totalPages={totalPages1}
            onPageChange={handlePageChange}
            handleItemsPerPageChange={handleItemsPerPageChange}
          />
        </div>

      </div>
    </>
  )
}

export default AllBets