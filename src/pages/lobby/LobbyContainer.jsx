import React, { useEffect, useState } from 'react'
import PaginationComponent from '../../component/pagination/PaginationComponent';
import { getCaller } from '../../services/api'

const LobbyContainer = () => {
    const [lobbyData, setLobbyData] = useState()
    const [length, setLength] = useState();
    const [activeIndex, setActiveIndex] = useState(null);

    const allLobbyList = async () => {
        const res = await getCaller(`round/stats`)
        setLobbyData(res?.data)
        setLength(res?.total)
    }
    const handleClick = (index) => {

        setActiveIndex(index)
        allLobbyList(index * 10)

    };
    useEffect(() => {
        allLobbyList()
    }, [])
    return (


        <div className="main-table-header" style={{ backgroundColor: "red", }}>
            <div className="main-table-content">
                <div className="wrapper-head">
                    <h3>Lobby Container</h3>
                    <div className='search-news-section'>
                        <div className="head-btn">
                            <button>Add Lobby</button>
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
                <table style={{  whiteSpace: "nowrap", border: ".5rem" }}>
                    <thead>
                        <tr className='custom-row'>
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
                            lobbyData?.length > 0 ? lobbyData?.map((el, l) => (
                                <tr className='custom-row' style={{ backgroundColor: "white" }} >
                                    <td data-label="UID"> <p className='uid_name' > {el?.lobby_id} </p> </td>
                                    <td data-label="SPORT"> {el?.start_time}</td>
                                    <td data-label="MARKET" height={70} > {el?.max_mult} </td>
                                    <td data-label="MARKET" height={70} > {el?.end_time} </td>
                                    <td data-label="MARKET" height={70} > {el?.total_bets} </td>
                                    <td data-label="MARKET" height={70} >   {el?.total_players !== null ? el.total_players : '0'}</td>
                                    <td data-label="MARKET" height={70} > {el?.total_bet_amount} </td>
                                    <td data-label="MARKET" height={70} > {el?.total_cashout_amount} </td>
                                    <td data-label="MARKET" height={70} > {el?.biggest_winner} </td>
                                    <td data-label="MARKET" height={70} > {el?.biggest_looser} </td>
                                    <td data-label="MARKET" height={70} > {el?.total_round_settled} </td>
                                    <td data-label="MARKET" height={70} > {el?.created_at} </td>
                                    <td
                                        data-label="MARKET"
                                        style={{ color: el?.status === 'CRASHED' ? 'red' : 'inherit' }}
                                        height={70} > {el?.status} </td>

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

    )
}

export default LobbyContainer
