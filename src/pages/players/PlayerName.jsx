import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Swal from 'sweetalert2'
import { postCaller } from '../../services/api'
import { icon, toastData } from '../Toast'
import { FaChevronDown } from "react-icons/fa";
import './player.css'
const error = Swal.mixin(toastData.error)
const success = Swal.mixin(toastData.success)


const PlayerName = () => {

  const { state } = useLocation();
  const data = state?.teamData;
  const [activeTeam, setActiveTeam] = useState(null);

  const handleAccordionClick = (index) => {
    setActiveTeam(activeTeam === index ? null : index);
  };

  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const handleFileChange = (e) => {
    const selectedImage = e.target.files[0];

    if (selectedImage) {
      setImage(selectedImage);

      const imageUrl = URL.createObjectURL(selectedImage);
      setImageUrl(imageUrl);
    }
  };

  const addStats = async (player_key) => {
    const res = await postCaller(`admin/v1/association/player/stats?ass_key=icc&player_key=${player_key}`)
    console.log(res)
    if (res.status === true) {
      await success.fire(Object.assign(icon.success, { title: res.msg }))

    }
    else {
      error.fire(Object.assign(icon.error, { title: res.msg }))

    }

  }

  const handleCoverImage = async (item) => {
    if (!image) {
      console.log('No image selected');
      return;
    }
    let formData = new FormData();
    formData.append("docs", image);
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/admin/v1/playerImage?p_key=${item.player_key}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      }
    ).then(response => response.json())
      .then((data) => {
        console.log('Image uploaded successfully:', data);
        setImageUrl(URL.createObjectURL(image));
        if (data.status === true) {
          success.fire(Object.assign(icon.success, { title: data.msg }))
        }
        else {
          error.fire(Object.assign(icon.error, { title: data.errMsg }))
        }

      })
      .catch(error => console.log(error))

  }

  return (
    <div className="table-border">
      <table className='Player-toggle'>
        <thead>
          <tr className='custom-row-1'>
            <th>Team Name</th>
            <th>Image</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((team, index) => (
            <React.Fragment key={team.key}>
              <tr onClick={() => handleAccordionClick(index)} className={activeTeam === index ? 'active' : 'custom-row'}>
                <td>{team?.name}</td>
                <td>
                  {team.image ? (
                    <div className='image-select'>
                      <img src={team.image} alt="Selected" className="tournament-image" />

                      <label className="custom-file-input">
                        <input type="file" hidden accept="image/*" onChange={(el) => handleFileChange(el)} />
                        <span className='select-img-btn'>Select Image</span>
                      </label>
                    </div>
                  ) : (
                    <div className="image-select">
                      <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" alt="" className="tournament-image" />
                      <label htmlFor='' className="custom-file-input">
                        <input type="file" hidden accept="image/*" onChange={(el) => handleFileChange(el)} />
                        <span>Upload Image</span>
                      </label>
                    </div>
                  )}
                  {team.image && (
                    <button className="update-button-1"
                      onClick={(e) => handleCoverImage(team)
                      }
                    >
                      Update Image
                    </button>
                  )}
                </td>
                <td>
                  <FaChevronDown className='mdDelete' />
                </td>
              </tr>
              {activeTeam === index && (
                <tr className='custom-row'>
                  <td colSpan="3">
                    <div className="player-list">
                      <h3>Players</h3>
                      <ul className='player-list-name'>
                        {team?.player?.map((player) => (
                          <li key={player.player_key}>{player.player_name}</li>
                        ))}
                      </ul>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
        {/* <tbody>
          {
            data?.map((el, index) => (

              <tr key={index} >
                <td>{el?.name}</td>
                <td>
                  {el.image ? (
                    <div className='image-select'>
                      <img src={el.image} alt="Selected" className="tournament-image" />

                      <label className="custom-file-input">
                        <input type="file" hidden accept="image/*" onChange={(el) => handleFileChange(el)} />
                        <span className='select-img-btn'>Select Image</span>
                      </label>
                    </div>
                  ) : (
                    <div className="image-select">
                      <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" alt="" className="tournament-image" />
                      <label className="custom-file-input">
                        <input type="file" hidden accept="image/*" onChange={(el) => handleFileChange(el)} />
                        <span>Upload Image</span>
                      </label>
                    </div>
                  )}
                  {el.image && (
                    <button className="update-button"
                      onClick={(e) => handleCoverImage(el)
                      }
                    >
                      Update Image
                    </button>
                  )}
                </td>


              </tr>

            ))

          }
        </tbody> */}
      </table>

    </div>
  )
}

export default PlayerName