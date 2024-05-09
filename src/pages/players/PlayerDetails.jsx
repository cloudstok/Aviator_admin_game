import React, { useEffect, useState } from 'react'
import { MdDelete, MdEdit } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import ToggleButton from '../../component/toggleButton/ToggleButton'
import { getCaller } from '../../services/api'
import './player.css'


const PlayerDetails = () => {
    const Navigate = useNavigate()
    const [toggleOpen, setToggleOpen] = useState(false)

    const [getPlayersData, setGetPlayersData] = useState([])


    const getPlayerByMatches = async (match_key) => {
        console.log(match_key, "vishal")
        const res = await getCaller(`admin/v1/match/team/player?match_key=icc_wc_2023_final`)
        console.log(res, "Deepak")

        setGetPlayersData(res?.data)
    }
    useEffect(() => {
        getPlayerByMatches()
    }, [])

    return (
        <>
            <div className="table-border">
                <table>
                    <thead>
                        <tr className='custom-row-1'>
                            <th align='center'></th>
                            <th width={1650} align='left'> Name </th>
                            <th width={1650} align='left'> Player Name </th>

                            {/* <th width={200} align='center'> Action</th>
                            <th width={200} align='center'> Enable</th> */}

                        </tr>
                    </thead>
                    <tbody>
                        {
                            getPlayersData?.length > 0 ? getPlayersData?.map((player, index) => (
                                    <tr className='custom-row' key={index} onClick={()=> Navigate('/player/PlayerName',{
                                    state: player.player
                                   } )}>
                                        <td>
                                            <div className='player-img-section'>
                                                <img src={player?.url} alt='' />

                                            </div>
                                        </td>

                                        <td width={600} data-label="SPORT" >{player?.name}</td>
                                        {/* <td width={600} data-label="SPORT" >{player}</td> */}


                                    </tr>
                                   
                            )) : <tr className=''><td className='no-data-coloumn' align='center' colSpan={10}>No Tournament Find Please Add</td></tr>

                        }


                    </tbody>



                </table>

            </div>
        </>
    )
}

export default PlayerDetails