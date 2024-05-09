import React, { useState } from 'react'

import { Link } from 'react-router-dom'
// import GameRule from './GameRule'
import { RiCloseFill } from 'react-icons/ri'
import youtube from '../../../src/assets/youtube.webp'
import  data from '../../test.jsx'

const HowToPlay = ({ setHowOpen }) => {
    // const [gameRuleOpen, setGameRuleOpen] = useState(false)
    return (
        <div className="overlay">
            <div className="header-modal-content-how" >
                <div className="header-modal-head" style={{ background: "#e69308" }}>
                    <h2 style={{ color: "#5f3816" }}>{data.header_modal_head_h2}</h2>
                    <div className="" onClick={() => setHowOpen(false)}>
                        <RiCloseFill className="icon-close" style={{ color: "#5f3816" }} />
                    </div>
                </div>
                <div className="">
                    <div className='how-to-play-container'>
                        <div className='video-section'>
                            <a href={data.header_modal_head_link} target="_blank" rel="noopener noreferrer">
                                <img src={youtube} style={{ width: "100%", height: "400px" }} alt="Video Thumbnail" />
                            </a>

                        </div>
                        <div className="how-to-play-card">
                            <div className="how-to-play-card-body">
                                <div className="how-to-play-card-content">
                                    <h1>{data.head_h1}</h1>
                                    <div className="how-to-img">
                                        <img src={data.head_h1_img} alt="" />
                                    </div>
                                </div>
                               <div className="">
                               <p className='prob-common-para' style={{ color: "#5f3816" }}>{data.prob_common_para}</p>
                               </div>
                            </div>
                            <div className="how-to-play-card-body">
                                <div className="how-to-play-card-content">
                                    <h1>{data.head_h2}</h1>
                                    <div className="how-to-img">
                                        <img src={data.head_h2_img} alt="" />
                                    </div>
                                </div>
                                <p className='prob-common-para' style={{ color: "#5f3816" }}>{data.prob_common_para2}</p>
                            </div>
                            <div className="how-to-play-card-body">
                                <div className="how-to-play-card-content">
                                    <h1>{data.head_h3}</h1>
                                    <div className="how-to-img">
                                        <img src={data.head_h3_img} alt="" />
                                    </div>
                                </div>
                                <p className='prob-common-para' style={{ color: "#5f3816" }}>{data.prob_common_para3}</p>
                            </div>
                        </div>
                    </div>
                    <div className="how-to-play-footer">
                        {/* <Link className='detail' onClick={() => setGameRuleOpen(true)}>detailed rules</Link> */}
                    </div>
                    {/* {
                        gameRuleOpen && (<GameRule setGameRule={setGameRuleOpen} />)
                    } */}
                </div>
            </div>

        </div>
    )
}

export default HowToPlay