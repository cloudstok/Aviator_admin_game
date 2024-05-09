import React, { useState } from 'react'
import './tournament.css'
import Pagination from '../../component/pagination/Pagination'

import TournamentImageUpload from './TournamentImageUpload'
const TournamentTable = ({ tournamentData, getTournamentByAsc, handleNext, handlePrev, offset, search }) => {
  

  
    return (
        <>
            <div className="table-border">
                <table>
                    <thead>
                        <tr className='custom-row-1'>

                            <th width={400} align='center'> Name </th>
                            <th width={200} align='center'>Cover Image</th>
                            <th width={100} align='center'> Action</th>
                            <th width={200} align='center'>Date/Time</th>
                            <th width={100} align='center'> Enable</th>
                        </tr>
                    </thead>
                    <tbody>
                        {

                            tournamentData?.length > 0 ? tournamentData?.map((tour, index) => (
                                <TournamentImageUpload tour={tour} key={index} getTournamentByAsc={getTournamentByAsc} />

                            )) : <tr className=''><td className='no-data-coloumn' align='center' colSpan={10}>No Tournament Find Please Add</td></tr>
                        }
                    </tbody>


                </table>
            </div>

          
        </>
    )
}

export default TournamentTable