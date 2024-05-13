import React from 'react'
import '../dashboard/dashboard.css'
import admin from '../../assets/adminLogo.png'
import { BiRefresh } from "react-icons/bi";

const Dashboard = () => {
  return (
    <div className='dashboard'>
      <div className='dashoard-h2'>
        <h2>Dashboard</h2>
        <div className='refresh-icon'>
          <BiRefresh />
        </div>
      </div>
      <div className='dashboard-container'>
        <div className="dashboard-box">
          <div className="dash-1">
            <h3 className="dash-h3">total bet</h3>
            <p>appStock dashboard</p>
          </div>
          <div className="dash-1">
            <h3 className="dash-h3">total cashout</h3>
            <p>total earnings</p>
          </div>
          <div className="dash-1">
            <h3 className="dash-h3">total user</h3>
            <p>pending orders</p>
          </div>
          {/* <div className="dash-1">
            <h3 className="dash-h3">$ 18.700</h3>
            <p>total revenue</p>
          </div> */}
        </div>

        <div className="calendar-container">
          {/* <div className="dashboard-calendar"> */}
            <div class="graph-container">
              <div className="bar" style={{ height:"80%"}}>
                <span className="bar-label">80%</span>
              </div>
              <div className="bar" style={{height:"60%"}}>
                <span className="bar-label">60%</span>
              </div>
              <div className="bar" style={{height:"90%"}}>
                <span className="bar-label">90%</span>
              </div>
              <div className="bar" style={{height:"75%"}}>
                <span className="bar-label">75%</span>
              </div>
            </div>
          {/* </div> */}

          <div className="daily-feed-container">
            <div className="daily-box">
              <h3 className="daily-h3">
                Daily feed
              </h3>
              <button>Today</button>
            </div>

            <div className="daily-profile">
              <div className="profile-img">
                <div className='profile-img-flex'>
                  <div><img src={admin} alt="" /></div>
                  <p><span style={{fontSize:"1.1rem",fontWeight:"bold",marginRight:".2rem"}}>deepak</span>Lorem, ipsum dolor.</p>
                </div>
                <div className="time-box">
                  <p>5m ago</p>
                </div>
              </div>
              <div className="day-container">
                <p>today 7:51pm</p>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default Dashboard