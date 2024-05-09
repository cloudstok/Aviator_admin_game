import React, { useState } from 'react'
import Swal from 'sweetalert2'
import { postCaller } from '../../services/api'
import { icon, toastData } from '../Toast'
import { FaChevronDown } from "react-icons/fa";
import '../matches/match.css'
import { BsUpload } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { CiEdit } from "react-icons/ci";

const PlayerImageUpload = ({ player, i,getTeamdetails }) => {
    const Navigate = useNavigate()
    const error = Swal.mixin(toastData.error)
    const success = Swal.mixin(toastData.success)
    const [image, setImage] = useState(player.image || null);
    const [imageUrl, setImageUrl] = useState(player.image || null);
    const handlePlayerFileChange = (e) => {
        const selectedImage = e.target.files[0];

        if (selectedImage) {
            setImage(selectedImage);

            const imageUrl = URL.createObjectURL(selectedImage);
            setImageUrl(imageUrl);
        }
    };

    const addStats = async (item) => {
        const res = await postCaller(`admin/v1/association/player/stats?ass_key=icc&player_key=${item.player_key}`)
        console.log(res)
        if (res.status === true) {
            await success.fire(Object.assign(icon.success, { title: res.msg }))

        }
        else {
            error.fire(Object.assign(icon.error, { title: res.msg }))

        }

    }

    const handlePlayerImageUpload = async (item) => {
        if (!image) {
            alert("please select image")
            return;
        }
        let formData = new FormData();
        formData.append("docs", image);
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/admin/v1/upload/player/image?p_key=${item.player_key}`,
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
                    getTeamdetails()
                }
                else {
                    error.fire(Object.assign(icon.error, { title: data.errMsg }))
                }

            })
            .catch(error => console.log(error))

    }
    return (
        <div className='player-list-name' key={i}>
            <p className='player-name'>{player.player_name}</p>
            <div className="player-img player-padding">
                {imageUrl ? (
                    <div className='image-select' >
                        <img src={imageUrl} alt="Selected" className="tournament-image" />

                        <label className="custom-file-input" >
                            <input type="file" hidden accept="image/*" onChange={(e) => handlePlayerFileChange(e, i)} />
                            <span className='select-img-btn'>Change Image</span>
                        </label>
                    </div>
                ) : (
                    <div className="image-select">
                        <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" alt="" className="tournament-image" />
                        <label className="custom-file-input">
                            <input type="file" hidden accept="image/*" onChange={(e) => handlePlayerFileChange(e, i)} />
                            <span>Upload Image</span>
                        </label>
                    </div>
                )}
                {imageUrl && (
                    <button className="update-button-1" onClick={(e) => handlePlayerImageUpload(player, i)}>
                        <BsUpload />
                    </button>
                )}
            </div>

            <div className="player-action player-padding">
                <button type='button' onClick={() => addStats(player)}><p style={{fontSize:"20px"}}>+</p></button>
                <button type='button' onClick={()=> Navigate('/editstatsform')} ><p><CiEdit style={{fontSize:"20px"}}/></p></button>
            </div>
        </div>
    )
}

export default PlayerImageUpload