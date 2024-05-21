import React, { useEffect, useState } from 'react'
import { getCaller } from '../../../services/api'
import PaginationComponent from '../../components/pagination/PaginationComponent';

const RoundStats = () => {
  const [lobbyData, setLobbyData] = useState()
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const allLobbyList = async () => {
    try {
      const offset = (currentPage - 1) * pageSize;
      const res = await getCaller(`round/stats?limit=${pageSize}&offset=${offset}`);
      setLobbyData(res.data);
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
    allLobbyList()
  }, [currentPage, pageSize])



  return (
    <div className="commissionContainer">
      <div className="TableContainer" style={{ overflowX: "auto", whiteSpace: "nowrap" }}>

        <table>
          <thead>
            <tr>
              <th> Lobby Id</th>
              <th> Start Time </th>
              <th> Max Mult </th>
              <th> End Time </th>
              <th> Total Bets </th>
              <th> Total Players </th>
              <th> Total Bet Amount </th>
              <th> Total Cashout Amount</th>
              <th> Biggest Winner</th>
              <th>Biggest Looser</th>
              <th> Total Round Settled</th>
              <th>Created At</th>

            </tr>
          </thead>
          <tbody>
            {
              lobbyData?.length > 0 ? lobbyData?.map((el, i) => (
                <tr style={{ backgroundColor: "white" }} key={i}>
                  <td> {el?.lobby_id} </td>
                  <td data-label="SPORT">
                    {el?.start_time}
                  </td>
                  <td data-label="MARKET" height={70} > {el?.max_mult} </td>
                  <td data-label="MARKET" height={70} > {el?.end_time} </td>
                  <td data-label="MARKET" height={70} > {el?.total_bets} </td>
                  <td data-label="MARKET" height={70}>
                    {el?.total_players !== null ? el?.total_players : 0}
                  </td>
                  <td data-label="MARKET" height={70} > {el?.total_bet_amount} </td>
                  <td data-label="MARKET" height={70} > {el?.total_cashout_amount} </td>
                  <td data-label="MARKET" height={70} > {el?.biggest_winner} </td>
                  <td data-label="MARKET" height={70} > {el?.biggest_looser} </td>
                  <td data-label="MARKET" height={70} > {el?.total_round_settled} </td>
                  <td data-label="MARKET" height={70} > {el?.created_at} </td>

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
  )
}

export default RoundStats
