import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getCaller } from '../../services/api'
import '../matches/match.css'
import TeamImageUpload from './TeamImageUpload'

const Teams = () => {

  const { id } = useParams();
  console.log(id)
  const [teamdetails, setTeamdetails] = useState([])
  const getTeamdetails = async () => {
    const res = await getCaller(`admin/v1/match/team/player?match_key=${id}`)
    setTeamdetails(res?.data)
  }
  useEffect(() => {
    getTeamdetails()
  }, [])
  console.log(teamdetails)
  return (
    <div className="table-border table-border-2">
      <table className='Player-toggle'>
        <thead>
          <tr className='custom-row-1'>
            <th width="40%">Team Name</th>
            <th width="50%">Team Image</th>
            <th width="10%">Team Player</th>
          </tr>
        </thead>
        <tbody>
          {teamdetails?.length > 0 ? teamdetails?.map((team, index) => (
            <TeamImageUpload team={team} key={index} index={index}
              getTeamdetails={getTeamdetails}
            />

          )) : null
          }
        </tbody>
      </table>

    </div>
  )
}

export default Teams