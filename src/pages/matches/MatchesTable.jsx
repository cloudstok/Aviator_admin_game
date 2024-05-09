import React, { useState } from 'react'
import './match.css'
import { MdDelete, MdEdit } from 'react-icons/md'
import { LuRefreshCcw } from 'react-icons/lu'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import ToggleButton from '../../component/toggleButton/ToggleButton'
import { getCaller, postCaller, updateCaller } from '../../services/api'
import { icon, toastData } from '../Toast'

import '../tournament/tournament.css'
const success = Swal.mixin(toastData.success)
const error = Swal.mixin(toastData.error)



const MatchesTable = ({ getMatchesData, getMatchesByTournament, page, perPage, startDate, endDate }) => {

    const updateMatches = async (item) => {
        const res = await postCaller(`admin/v1/match/details?match_key=${item?.match_key}`)
        if (res?.status === true) {
            await success.fire(Object.assign(icon.success, { title: "Match Update Successfully" }))
        }
        else {
            error.fire(Object.assign(icon.error, { title: "error" }))

        }
    }
    const handleSubscribe = async (item) => {
        const res = await getCaller(`admin/v1/subscribe/match/${item.match_key}`)
        if (res?.status === true) {
            await success.fire(Object.assign(icon.success, { title: "Match Update Successfully" }))
            await getMatchesByTournament(item?.tou_key)
        }
        else {
            error.fire(Object.assign(icon.error, { title: "error" }))
        }
    }

    const handleToggle2 = async (item) => {
        const res = await postCaller(`admin/v1/update/match?match_key=${item.match_key}`, { is_Active: item.is_Active === 1 ? 0 : 1 })
        if (res?.status === "success") {
            let msg = ""
            msg = item.is_Active ? "Match Deactivated Successfully" : "Match Activated Successfully"
            success.fire(Object.assign(icon.success, { title: msg }))

                .then(async (response) => {
                    if (response) {
                        getMatchesByTournament(item?.tou_key)
                    }
                })
        }
        else {
            error.fire(Object.assign(icon.error, { title: res?.errMsg }))
        }
    };
    if (startDate && endDate) {
        getMatchesData = getMatchesData?.filter(e => (startDate <= (e.start_at * 1000) && endDate >= (e.start_at * 1000)))
    }

    return (
        <>
                    <table style={{overflowX:"auto",whiteSpace:"nowrap"}}>
                        <thead>
                            <tr className='custom-row-1'>
                                <th width={140}>Match No.</th>
                                <th width={300} align='left' >Name </th>
                                <th width={160} align='left' >Format</th>
                                <th width={200} align='left' >Start_at</th>
                                <th width={200} align='left'> Status </th>
                                <th align='left'> Team</th>
                                <th align='left'> Action</th>
                                <th align='left'> Enable</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                getMatchesData?.length > 0 ? getMatchesData?.map((match, index) => (
                                    <tr height={65} className={`custom-row ${match?.is_Active === 0 ? "disabled-row" : ""}`} key={index} disabled={match.is_Active === 0}>
                                        <td width={140}>{match?.sub_title}</td>
                                        <td width={300} data-label="SPORT" style={{ paddingLeft: ".5rem" }} >{match?.name}</td>
                                        <td width={160} >{match.format}</td>
                                        <td width={200}  >{new Date(match?.start_at * 1000).toLocaleString()}</td>
                                        <td width={200} data-label="SPORT">
                                            <div className='matchdata-flex'>
                                                {match?.in_Houre ?
                                                    <div>
                                                        <p>Start In</p>
                                                        <p style={{ color: "black", fontWeight: "bold" }}>

                                                            {
                                                                (new Date(match?.start_at * 1000).toLocaleString()).split(',')[1]
                                                            }</p>
                                                    </div>
                                                    : <p style={{ color: match.status === "completed" ? "green" : "red", textTransform: "uppercase", fontWeight: 'bold' }}>{match?.status}</p>}
                                                <div className='subscribe-section' >
                                                    {
                                                        match?.in_Houre === true ? <button disabled={match?.is_subscribe === 1} type='button' onClick={() => handleSubscribe(match)} >Subscribe</button> : ""
                                                    }
                                                </div>
                                            </div>
                                        </td>
                                        <td  >
                                            <Link className='show-btn' to={`/matches/teams/${match?.match_key}`}>Show</Link>
                                        </td>
                                        <td data-label="STATUS"  >
                                            <div className='user-icon' >
                                                <div className="icon-action" onClick={() => updateMatches(match)}>
                                                    <LuRefreshCcw className='mdDelete' />
                                                    <span className="tooltiptext">Refresh</span>
                                                </div>
                                                <div className="icon-action" style={{ backgroundColor: "#F44464" }} >
                                                    <MdDelete className='mdDelete' />
                                                    <span className="tooltiptext">Delete</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td data-label="MARKET"    >
                                            <button className={`enabled ${match?.is_Active === 0 ? 'disabled' : null}`} onClick={() => handleToggle2(match)}>
                                                {
                                                    match.is_Active !== 1 ? "Enabled" : "Disabled"
                                                }
                                            </button>
                                        </td>
                                    </tr>
                                )) : <tr className=''><td className='no-data-coloumn' align='center' colSpan={10}>No Data</td></tr>

                            }


                        </tbody>
                    </table>
              
        </>
    )
}

export default MatchesTable