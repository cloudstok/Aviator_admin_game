import React, { useState } from 'react'
import Swal from 'sweetalert2'
import img from '../../assets/person-dummy.jpg'
import { icon, toastData } from '../Toast'
import '../matches/match.css'
import { BsUpload } from "react-icons/bs";
import PlayerImageUpload from './PlayerImageUpload';
import { FaChevronRight } from 'react-icons/fa'
import { FaChevronDown } from 'react-icons/fa'

const error = Swal.mixin(toastData.error)
const success = Swal.mixin(toastData.success)


const TeamImageUpload = ({ team, index, getTeamdetails }) => {
  console.log(team)
  const [isOpen, setIsOpen] = useState(false);
  const [activeTeam, setActiveTeam] = useState(null);

  const handleAccordionClick = (index) => {
    setActiveTeam(activeTeam === index ? null : index);
    setIsOpen(!isOpen);
  };
  const [image, setImage] = useState(team?.url || null);
  const [imageUrl, setImageUrl] = useState(team?.url || null);

  const handleFileChange = (e) => {

    const selectedImage = e.target.files[0];

    if (selectedImage) {
      setImage(selectedImage);
      const imageUrl = URL.createObjectURL(selectedImage);
      setImageUrl(imageUrl);
    }
  };


  const handleCoverImage = async (item) => {
    if (!team.url) {
      if (!image) {
        console.log('No image selected');
        return;
      }
      let formData = new FormData();
      formData.append("docs", image);
      formData.append("code", team?.code)
      formData.append("name", team?.name)
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/admin/v1/teams/image`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: formData
        }
      ).then(response => response.json()).then((data) => {
        console.log('Image uploaded successfully:', data);
        setImageUrl(URL.createObjectURL(image));
        if (data.status === true) {
          success.fire(Object.assign(icon.success, { title: data.msg }))
          getTeamdetails()
        }
        else {
          error.fire(Object.assign(icon.error, { title: data.errMsg }))
        }
      }).catch(error => console.log(error))
    }
    else {
      if (!image) {
        console.log('No image selected');
        return;
      }
      let formData = new FormData();
      formData.append("docs", image);

      formData.append("name", team?.name)
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/admin/v1/update/teams/image?code=${team?.code}`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: formData
        }
      ).then(response => response.json()).then((data) => {
        console.log('Image uploaded successfully:', data);
        setImageUrl(URL.createObjectURL(image));
        if (data.status === true) {
          success.fire(Object.assign(icon.success, { title: data.msg }))
          getTeamdetails()
        }
        else {
          error.fire(Object.assign(icon.error, { title: data.errMsg }))
        }
      }).catch(error => console.log(error))
    }
  }
  return (
    <React.Fragment key={team.key}>
        <tr className={activeTeam === index ? 'active' : 'custom-row'}>
          <td width="40%" style={{ paddingLeft: ".5rem" }}>
            <div className="user-flex-1">
            {
              team?.url ? <img src={team?.url} alt="" /> : <img src={img} alt=''/>
            }
              <p className="" >
                {team.name} </p>
            </div>
          </td>
          <td width="30%">
            <div className="tournament-flex-1">
              <div className="image-select">

                <label className="custom-file-input">
                  <input type="file" accept="image/*" onChange={(e) => handleFileChange(e)} />

                </label>
              </div>
              <button className="update-button-1" onClick={(e) => handleCoverImage(team)}>
                <BsUpload />
              </button>
            </div>
          </td>
          <td>
            <div className='style-summary'>

              <div className='image-player-button'>
                <button onClick={() => handleAccordionClick(index)}>
                  {isOpen ? <FaChevronDown /> : <FaChevronRight />}
                </button>

              </div>

            </div>
          </td>
        </tr>
        {
          activeTeam === index && (
            <tr className='custom-row'>
              <td colSpan="3" style={{ padding: "0" }}>
                <div className="player-list">
                  <div className="player-head">
                    <h3 className='player-name'>Player Name</h3>
                    <h3 className='player-img player-padding' >Player Image</h3>
                    <h3 className='player-action player-padding ' >Action</h3>
                  </div>
                  {team?.player?.map((player, i) => (
                    <PlayerImageUpload player={player} key={i} i={i} getTeamdetails={getTeamdetails} />
                  ))}

                </div>
              </td>
            </tr>
          )}
         
    </React.Fragment>
  )
}

export default TeamImageUpload