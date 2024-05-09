import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import PlayerDetails from './PlayerDetails';

const Player = () => {
    let { id } = useParams();
    const navigator = useNavigate()
    
    const [activeIndex, setActiveIndex] = useState(0)
    const resultTabData = [
        { name: "Player", route: <PlayerDetails id={id} /> },
        // {name:"Points",route:<TournamentsPoints id={id}/>},
        // { name: "Stats", route: <TournamentStats id={id} /> },
    
      ]
    return (
        <>
            <div className="wrapper" >
                <div className="wrapper-head">
                    <h3>Player Details</h3>
                    <div className="add-btn">
                        {/* <button onClick={(()=>navigator('/players/AddPlayers'))}>Add Player</button> */}
                    </div>
                </div>
                <ul className="tab-container">
                    {
                        resultTabData.map((el, i) => (
                            <li key={i} className={`tab-box ${activeIndex === i ? 'active-result-tab' : null}`} onClick={() => setActiveIndex(i)} >
                                {el.name}
                            </li>
                        ))
                    }

                </ul>
                {resultTabData[activeIndex].route}

            </div>

        </>
    )
}

export default Player