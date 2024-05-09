import React, { useState, useEffect } from 'react'
import { getCaller } from '../../services/api'

const AllBets = () => {
  const [allBet, setAllBet] = useState([])


  const getAllBet = async () => {
    const res = await getCaller(`bet`)
    setAllBet(res?.data)

  }
  console.log(allBet, "deepak")

  useEffect(() => {
    getAllBet()
  }, [])

  return (
    <div className="table-header">
      <table style={{ overflowX: "auto", whiteSpace: "nowrap", border: ".5rem" }}>
        <thead>
          <tr className='custom-row'>
            <th> Id </th>
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
            allBet?.length > 0 ? allBet?.map((el, l) => (
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
                  style={{ color: el?.status === 'CRASHED' ? 'red' : 'inherit' }}
                  height={70} > {el?.status} </td>              </tr>
            )) : null
          }


        </tbody>
      </table>
    </div>
  )
}

export default AllBets